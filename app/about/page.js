import { Text, Button, Flex, Heading, Container, Link } from "@radix-ui/themes";
import Navbar from "../components/navigation/NavBar";
import Head from "next/head";

export default function About() {
  return (
    <Flex direction="column">
      <Container size="4" px={{ initial: 4 }}>
        <Navbar />
        <Flex
          direction="column"
          py={{ initial: "7", md: "9" }}
          gap={{ initial: "0", md: "2" }}
        >
          <Text size={{ initial: "4", md: "8" }}>
            I’m currently working @{" "}
            <Link href="https://righthub.com/">Righthub</Link> and also building{" "}
            <Link>Togæther</Link>. When I’m not designing, you can find me on
            Aarhus’ playgrounds 🛝 with my kid or playing pizzaiolo 👨🏻‍🍳🍕.
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
}
