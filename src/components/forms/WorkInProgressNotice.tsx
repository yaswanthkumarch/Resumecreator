import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WorkInProgressNotice() {
  return (
    <Card className="animate-fade-in shadow-md max-w-lg mx-auto mt-10 p-6 text-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">🚧 Work in Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground">
          Our team is currently working hard to improve this feature. Thanks for your patience!
        </p>
      </CardContent>
    </Card>
  );
}
