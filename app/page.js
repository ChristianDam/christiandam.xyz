import { Text, Flex, Heading, Container, Link } from "@radix-ui/themes";
import Navbar from "./components/navigation/NavBar";

export default function Home() {
  return (
    <Flex direction="column">
      <Container size="4" px={{ initial: 4 }}>
        <Navbar />
        <Flex
          direction="column"
          py={{ initial: "7", md: "9" }}
          style={{ borderBottom: "1px solid " }}
        >
          <h1 className="text-4xl md:text-8xl font-bold">I'm Christian,</h1>
          <h1 className="text-4xl md:text-8xl font-bold">a product designer</h1>
          <h1 className="text-4xl md:text-8xl font-bold">based in Aarhus.</h1>
        </Flex>
        <Flex
          direction="column"
          py={{ initial: "7", md: "9" }}
          gap={{ initial: "0", md: "2" }}
          style={{ borderBottom: "1px solid " }}
        >
          <Text color="gray">About</Text>
          <Text size={{ initial: "4", md: "8" }}>
            I’m currently working @ <Link href="#">Righthub</Link> and also
            building <Link>Togæther</Link>. When I’m not designing, you can find
            me on Aarhus’ playgrounds 🛝 with my kid or playing pizzaiolo 👨🏻‍🍳🍕.
          </Text>
        </Flex>

        <Flex
          direction="column"
          py={{ initial: "7", md: "9" }}
          gap={{ initial: "2", md: "6" }}
          style={{ borderBottom: "1px solid " }}
        >
          <Heading size={{ initial: "7", md: "9" }} weight="medium">
            Selected work
          </Heading>
          <Text size={{ initial: "4", md: "6" }}>
            A mix of new and old work. Head to <Link>Work</Link> to see all.
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
}
