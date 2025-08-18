import {
  ArcTimeline,
  ArcTimelineItem,
} from "@/components/magicui/arc-timeline";
import {
  RocketIcon,
  CubeIcon,
  LockClosedIcon,
  GlobeIcon,
  GearIcon,
  LightningBoltIcon,
  StarIcon,
  MagicWandIcon,
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

