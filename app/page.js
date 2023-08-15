import { Text, Button, Flex, Table, Container } from "@radix-ui/themes";
import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <Container size="4">
      <Flex justify="between">
        <Text weight="bold">Christian Dam</Text>
        <Button variant="soft">
          <FaceIcon /> Hello
        </Button>
      </Flex>
    </Container>
  );
}
