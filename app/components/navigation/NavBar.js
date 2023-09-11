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
        <Link
          href="https://chdam.notion.site/Reading-List-0dd20717c9e548718e32ec51195a6dd4?pvs=4"
          color="gray"
        >
          Reading list
        </Link>
        <Link href="/about" color="gray">
          About
        </Link>
        <Link href="mailto:me@christiandam.xyz" color="gray">
          Contact
        </Link>
      </Flex>
    </Flex>
  );
}
