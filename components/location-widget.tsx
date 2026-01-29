import { MapPin } from 'iconoir-react';
import type { LocationData } from '@/lib/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Muted } from '@/components/ui/typography';

interface LocationWidgetProps {
  location: LocationData;
}

export default function LocationWidget({ location }: LocationWidgetProps) {
  const { city, country } = location;

  // Don't render if location is unknown
  if (country === 'Unknown') {
    return null;
  }

  return (
    <Card className="h-full w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-lg font-medium">Hello to you in {country}</p>
            <Muted>Greetings from {city}</Muted>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
