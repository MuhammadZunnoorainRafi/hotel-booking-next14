import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

type Props = {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  children: React.ReactNode;
};

function CardWrapper({
  headerLabel,
  backButtonHref,
  backButtonLabel,
  children,
}: Props) {
  return (
    <Card className=" w-[400px]">
      <CardHeader>
        <h1 className=" text-3xl font-bold font-mono">Login Form</h1>
        <p className="text-xl">{headerLabel}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button asChild variant="link">
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardWrapper;
