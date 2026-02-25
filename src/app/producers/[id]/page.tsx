import ProducerDetails from "@/src/components/producers/ProducerDetails";

interface ProducerPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProducerPage({ params }: ProducerPageProps) {
  const { id } = await params;
  
  return <ProducerDetails id={id} />;
}
