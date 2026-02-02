import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Large } from "@/components/ui/typography";

export default function Bio() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>About me</CardTitle>
      </CardHeader>
      <CardContent>
        <Large className="font-medium">
          I&apos;m a product designer based in Copenhagen, Denmark. I specialize
          in crafting intuitive digital experiences that balance aesthetics with
          functionality. When I&apos;m not designing, you&apos;ll find me
          running, reading, or exploring new ideas.
        </Large>
      </CardContent>
    </Card>
  );
}
