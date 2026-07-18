import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PagePlaceholder({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <p className="eyebrow">{eyebrow}</p>
        <CardTitle className="display-type text-3xl font-extrabold text-ink">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
