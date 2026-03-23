'use client'

import { useEffect, useState, useCallback } from 'react'

interface Obstacle {
  id: number
  lane: number
  y: number
}

export default function GamePage() {
  const [playerLane, setPlayerLane] = useState(1) // 0, 1, or 2 (left, middle, right)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [obstacleIdCounter, setObstacleIdCounter] = useState(0)

  // Start game
  const startGame = useCallback(() => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setMissed(0)
    setTimeLeft(60)
    setObstacles([])
    setPlayerLane(1)
    setObstacleIdCounter(0)
  }, [])

  // Handle spacebar press to start game or change lanes
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault()

      if (!gameStarted || gameOver) {
        // Start or restart the game
        startGame()
      } else {
        // Change lanes during gameplay
        setPlayerLane((prev) => (prev + 1) % 3) // Cycle through lanes 0 -> 1 -> 2 -> 0
      }
    }
  }, [gameStarted, gameOver, startGame])

  // Add keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [gameStarted, gameOver])

  // Game loop - move cars and check for catches
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameInterval = setInterval(() => {
      setObstacles((prev) => {
        const playerY = 85
        let caughtCar = false
        let missedCar = false

        // Move cars and check for catches or misses
        const updated = prev
          .map((obs) => ({ ...obs, y: obs.y + 4 }))
          .filter((obs) => {
            // Check if player caught this car
            if (obs.lane === playerLane && obs.y >= playerY - 8 && obs.y <= playerY + 8) {
              caughtCar = true
              return false // Remove caught car
            }

            // Check if car escaped past the bottom
            if (obs.y >= 100) {
              missedCar = true
              return false // Remove escaped car
            }

            return true
          })

        // Update score and missed count
        if (caughtCar) {
          setScore((prev) => prev + 10)
        }
        if (missedCar) {
          setMissed((prev) => {
            const newMissed = prev + 1
            if (newMissed >= 5) {
              setGameOver(true)
            }
            return newMissed
          })
        }

        return updated
      })
    }, 50)

    return () => clearInterval(gameInterval)
  }, [gameStarted, gameOver, playerLane])

  // Spawn new obstacles
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const spawnInterval = setInterval(() => {
      setObstacleIdCounter((prev) => prev + 1)
      const randomLane = Math.floor(Math.random() * 3)

      setObstacles((prev) => [
        ...prev,
        { id: obstacleIdCounter + 1, lane: randomLane, y: -10 }
      ])
    }, 1500)

    return () => clearInterval(spawnInterval)
  }, [gameStarted, gameOver, obstacleIdCounter])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 pixel-text">Police Chase</h1>
        <p className="text-gray-300 pixel-text">Press SPACE to catch thief cars!</p>
      </div>

      {/* Game container */}
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-2xl" style={{ width: '400px', height: '600px' }}>
        {/* Road */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700">
          {/* Road lines */}
          <div className="absolute left-1/3 top-0 w-1 h-full bg-white opacity-30 road-line" />
          <div className="absolute left-2/3 top-0 w-1 h-full bg-white opacity-30 road-line" />
        </div>

        {/* Game area */}
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xl pixel-text"
            >
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-20">
            <h2 className="text-4xl font-bold text-red-500 mb-4 pixel-text">Game Over!</h2>
            <p className="text-2xl text-white mb-2 pixel-text">Score: {score}</p>
            <p className="text-xl text-red-400 mb-6 pixel-text">
              {timeLeft === 0 ? "Time's up!" : "Too many thieves escaped!"}
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xl pixel-text"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Score, Missed, and Timer */}
        {gameStarted && !gameOver && (
          <div className="absolute top-4 right-4 text-white pixel-text z-10">
            <div className="text-2xl font-bold">Score: {score}</div>
            <div className="text-lg text-red-400">Missed: {missed}/5</div>
            <div className="text-lg text-yellow-400">Time: {timeLeft}s</div>
          </div>
        )}

        {/* Thief cars */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute transition-none thief-car"
            style={{
              left: `${obs.lane * 33.33 + 16.66}%`,
              top: `${obs.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Thief car pixel art */}
            <div className="relative" style={{ width: '40px', height: '60px' }}>
              <div className="absolute inset-0 bg-red-600 rounded-sm" />
              <div className="absolute top-1 left-1 right-1 h-6 bg-red-400 rounded-sm" />
              <div className="absolute top-2 left-2 right-2 h-4 bg-red-900" />
              <div className="absolute bottom-2 left-1 w-3 h-3 bg-gray-900 rounded-full" />
              <div className="absolute bottom-2 right-1 w-3 h-3 bg-gray-900 rounded-full" />
            </div>
          </div>
        ))}

        {/* Player police car */}
        {gameStarted && (
          <div
            className="absolute transition-all duration-200 ease-out"
            style={{
              left: `${playerLane * 33.33 + 16.66}%`,
              top: '85%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Police car pixel art */}
            <div className="relative" style={{ width: '40px', height: '60px' }}>
              <div className="absolute inset-0 bg-blue-600 rounded-sm" />
              <div className="absolute top-1 left-1 right-1 h-6 bg-blue-400 rounded-sm" />
              <div className="absolute top-2 left-2 right-2 h-4 bg-blue-900" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-red-500 rounded-full animate-pulse" />
              <div className="absolute bottom-2 left-1 w-3 h-3 bg-gray-900 rounded-full" />
              <div className="absolute bottom-2 right-1 w-3 h-3 bg-gray-900 rounded-full" />
              <div className="absolute top-8 left-1 right-1 h-3 bg-white text-[8px] flex items-center justify-center font-bold">
                POLICE
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .pixel-text {
          image-rendering: pixelated;
          font-family: monospace;
        }

        .road-line {
          background-image: linear-gradient(to bottom, white 50%, transparent 50%);
          background-size: 1px 40px;
          animation: road-scroll 0.5s linear infinite;
        }

        @keyframes road-scroll {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0 40px;
          }
        }

        .thief-car {
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  )
}
