import { GridPatternCard, GridPatternCardBody, PlaceholdersAndVanishInput } from "@/components/ui/card-with-grid-ellipsis-pattern"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export function GridPatternCardDemo() {
  const { toast } = useToast()
  const [selectedField, setSelectedField] = useState("")
  const [customField, setCustomField] = useState("")
  const [email, setEmail] = useState("")

  const placeholders = [
    "Enter your email address",
    "Get updates and newsletters", 
    "Subscribe to our mailing list",
    "Join our community today",
    "Stay informed with our updates"
  ];

  const professionalFields = [
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Engineer",
    "Cloud Architect",
    "Cybersecurity Engineer",
    "Mobile Developer",
    "AI/ML Engineer",
    "Software Architect",
    "Site Reliability Engineer (SRE)",
    "Data Scientist",
    "Product Manager (Tech)",
    "Enter your own"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalField = selectedField === "Enter your own" ? customField : selectedField;
    if (!selectedField || !email || (selectedField === "Enter your own" && !customField)) {
      toast({
        title: "Missing information",
        description: "Please select your professional field and enter your email address.",
        variant: "destructive"
      })
      return;
    }

    try {
      // Check if email already exists
      const { data: existingEntry } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (existingEntry) {
        toast({
          title: "Email already registered",
          description: "This email is already on our waitlist!",
          variant: "destructive"
        });
        return;
      }
      
      // Insert new entry
      const { error } = await supabase
        .from('waitlist')
        .insert({
          email: email,
          professional_field: finalField
        });
      
      if (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
        console.error('Error:', error);
        return;
      }
      
      toast({
        title: "Congratulations!",
        description: `Thank you! We'll contact you at ${email} with updates for ${finalField} professionals.`,
      });
      
      // Reset form
      setSelectedField("");
      setCustomField("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      console.error('Error:', error);
    }
  };

  return (
    <GridPatternCard>
      <GridPatternCardBody>
        <h3 className="text-lg font-bold mb-1 text-foreground">
          Join the waitlist and Colab with Broad
        </h3>
        <p className="text-wrap text-sm text-foreground/60">
          Broad is a collaboration tool between employees from big tech companies and future hires. 
          They will help you see the kind of work done inside these companies, gain their knowledge 
          and experiences to help you land your next tech job.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Professional Field
            </label>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your professional field" />
              </SelectTrigger>
              <SelectContent>
                {professionalFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedField === "Enter your own" && (
              <Input
                placeholder="Enter your professional field"
                value={customField}
                onChange={(e) => setCustomField(e.target.value)}
                className="mt-2"
              />
            )}
          </div>
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
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/f80dce0c-1e0d-4141-98ab-d9e65db49367.png" 
            alt="Broad Logo" 
            className="w-16 h-16 object-contain"
          />
        </div>
        <GridPatternCardDemo />
      </div>
    </div>
  );
};

export default Index;