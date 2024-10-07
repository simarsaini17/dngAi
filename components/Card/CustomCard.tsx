import { useState } from "react";
import { Button } from "../Button/Button";
import { Badge } from "../ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface CardProps {
  title: string;
  description: string;
  tags?: string[];
  buttonLabel: string;
}

const CustomCard: React.FC<CardProps> = ({
  title,
  description,
  tags,
  buttonLabel,
}: CardProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleCardClick = () => {
    setIsFocused((prev) => !prev); // Toggle focus state
  };
  return (
    <div
      className={`border flex flex-col justify-center rounded-lg transition-all duration-200 ease-in-out ${
        isFocused
          ? "border-blue-700 ring-1 ring-blue-700 ring-opacity-20"
          : "hover:border-gray-400"
      }`}
      onClick={handleCardClick}
      onBlur={() => setIsFocused(false)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-semibold">{title}</CardTitle>
          <Button variant={"link"}>
            <DotsHorizontalIcon className="h-5 w-5 text-gray-500 rotate-90" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <div className="flex space-x-2 mt-4">
          {tags?.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-blue-200 text-blue-700 rounded-xl"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <div className="">
        <CardFooter className="w-full">
          <Button variant={"outline"}>{buttonLabel}</Button>
        </CardFooter>
      </div>
    </div>
  );
};
export default CustomCard;
