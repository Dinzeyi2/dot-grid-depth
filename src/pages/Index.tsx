import { GridPatternCard, GridPatternCardBody, PlaceholdersAndVanishInput } from "@/components/ui/card-with-grid-ellipsis-pattern"
import { useToast } from "@/hooks/use-toast"

export function GridPatternCardDemo() {
  const { toast } = useToast()

  const placeholders = [
    "Enter your email address",
    "Get updates and newsletters",
    "Subscribe to our mailing list",
    "Join our community today",
    "Stay informed with our updates"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Question submitted!",
      description: "Thank you for your question. We'll get back to you soon!",
    })
  };

  return (
    <GridPatternCard>
      <GridPatternCardBody>
        <h3 className="text-lg font-bold mb-1 text-foreground">
          Grid Pattern with Ellipsis
        </h3>
        <p className="text-wrap text-sm text-foreground/60">
          A sophisticated pattern combining grid layout with ellipsis dots. 
          Perfect for creating depth and visual interest while maintaining 
          readability and modern aesthetics.
        </p>
        <div className="mt-6">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </GridPatternCardBody>
    </GridPatternCard>
  )
}

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-md">
        <GridPatternCardDemo />
      </div>
    </div>
  );
};

export default Index;