import {
  ArcTimeline,
  ArcTimelineItem,
} from "@/components/magicui/arc-timeline";
import {
  CubeIcon,
  GearIcon,
  GlobeIcon,
  LightningBoltIcon,
  LockClosedIcon,
  MagicWandIcon,
  RocketIcon,
  StarIcon,
} from "@radix-ui/react-icons";

export interface TimelineCardProps {
  data: ArcTimelineItem[];
  defaultActiveTime: string;
}

export default function TimelineCard({
  data,
  defaultActiveTime,
}: TimelineCardProps) {
  return (
    <ArcTimeline
      className="rounded-4xl bg-background p-5"
      data={data}
      defaultActiveStep={{ time: defaultActiveTime, stepIndex: 0 }}
      arcConfig={{
        circleWidth: 4500,
        angleBetweenMinorSteps: 0.4,
        lineCountFillBetweenSteps: 8,
        boundaryPlaceholderLinesCount: 50,
      }}
    />
  );
}

// Keeping icons imported above for consumer usage convenience
export const TimelineIcons = {
  RocketIcon,
  CubeIcon,
  LockClosedIcon,
  GlobeIcon,
  GearIcon,
  LightningBoltIcon,
  StarIcon,
  MagicWandIcon,
};
