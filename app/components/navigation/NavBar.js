import { Text, Flex, Link } from "@radix-ui/themes";

export default function Navbar() {
  return (
    <Flex justify="between" py={{ initial: "4", md: "6" }}>
      <Link href="/" weight="bold" color="gray" highContrast underline="none">
        ✦ Christian Dam ✦
      </Link>
      <Flex gap="5">
        <Link href="/about" color="gray">
          Work
        </Link>
        <Link href="/about" color="gray">
          Reading list
        </Link>
        <Link href="/about" color="gray">
          About
        </Link>
        <Link href="/about" color="gray">
          Contact
        </Link>
      </Flex>
    </Flex>
  );
}
