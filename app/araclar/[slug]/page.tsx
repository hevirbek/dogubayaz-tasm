import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MetricTool } from "@/components/tools/MetricTool";
import { ScheduleTool } from "@/components/tools/ScheduleTool";
import { siteConfig } from "@/config/site";
import { calculatorTools, getCalculatorTool } from "@/lib/tools/catalog";

type ToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return calculatorTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getCalculatorTool(slug);

  if (!tool) {
    return { title: "Araç bulunamadı" };
  }

  return {
    title: tool.label,
    description: `${siteConfig.asmName}: ${tool.description}`,
    alternates: { canonical: tool.href }
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getCalculatorTool(slug);

  if (!tool) notFound();
  if (tool.kind === "schedule") return <ScheduleTool tool={tool} />;
  return <MetricTool tool={tool} />;
}
