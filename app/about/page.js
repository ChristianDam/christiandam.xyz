import { Text, Button, Flex, Heading, Container } from "@radix-ui/themes";
import Navbar from "../components/navigation/NavBar";
import Head from "next/head";

export default function About() {
  return (
    <Flex direction="column">
      <Container size="4" px={{ initial: 4 }}>
        <Navbar />
        <Flex>
          <Heading size="9">About</Heading>
        </Flex>
      </Container>
    </Flex>
  );
}
