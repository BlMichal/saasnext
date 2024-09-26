import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Half1Icon } from "@radix-ui/react-icons";
import { Check } from "lucide-react";
import SubmitButton from "../SubmitButton";
import Link from "next/link";
import { CreateSubscription } from "@/app/actions";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "The best pricing plan for people starting out.",
    benefits: [
      "1 Site",
      "Up to 1000 visitors",
      "Up to 1000 visitors",
      "Up to 1000 visitors",
    ],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Startup",
    cardDescription: "The best pricing plan for professionals.",
    benefits: [
      "10 Site",
      "Up to 100000 visitors",
      "Up to 100000 visitors",
      "Up to 100000 visitors",
    ],
    priceTitle: "$4,99",
  },
  {
    id: 2,
    cardTitle: "Company",
    cardDescription: "The best pricing plan for whole company.",
    benefits: [
      "Unlimited Sites",
      "Unlimited visitors",
      "Unlimited visitors",
      "Unlimited visitors",
    ],
    priceTitle: "$9,99",
  },
];

export function PricingTable() {
  return (
    <>
      <div className=" max-w-4xl mx-auto text-center">
        <p className="mt-2 tracking-tight">Pricing plans for everyone.</p>
        <h1 className="mt-2 text-primary text-4xl font-semibold">Pricing</h1>
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center leading-6 text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, hic
        nulla. Sint excepturi, accusantium numquam a unde, suscipit quisquam
        officiis pariatur illum hic quam labore sequi placeat quia, eius
        veritatis!
      </p>

      <div className="grid grid-cols-1 gap-4 mt-9 md:grid-cols-2 lg:grid-cols-3">
        {PricingPlans.map((plan) => (
          <Card key={plan.id} className={plan.id == 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {plan.id == 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Startup </h3>
                    <p className="text-sm text-primary">*Most popular</p>
                  </div>
                ) : (
                  <>{plan.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{plan.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-4 text-4xl font-bold tracking-tight">
                {plan.priceTitle}
              </p>
              <ul className="mt-6 space-y-2 text-sm leading-6 text-muted-foreground">
                {plan.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-x-3">
                    <Check className="text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.id !== 0 ? (
                <form action={CreateSubscription}>
                  <SubmitButton text="Buy Plan" className="mt-5"/>
                </form>
              ) : (
                <Button className="mt-5" asChild><Link href={'/dashboard/'}>Try for free</Link></Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
