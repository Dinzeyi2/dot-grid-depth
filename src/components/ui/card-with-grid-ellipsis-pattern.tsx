import { cn } from '@/lib/utils'
import { motion } from "framer-motion"

interface GridPatternCardProps {
  children: React.ReactNode
  className?: string
  patternClassName?: string
  gradientClassName?: string
}

export function GridPatternCard({ 
  children, 
  className,
  patternClassName,
  gradientClassName
}: GridPatternCardProps) {
  return (
    <motion.div
      className={cn(
        "border w-full rounded-md overflow-hidden",
        "bg-background",
        "border-border",
        "p-3",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={cn(
        "size-full bg-repeat bg-[length:30px_30px]",
        "bg-grid-pattern-light dark:bg-grid-pattern",
        patternClassName
      )}>
        <div className={cn(
          "size-full bg-gradient-to-tr",
          "from-background/90 via-background/40 to-background/10",
          gradientClassName
        )}>
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export function GridPatternCardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("text-left p-4 md:p-6", className)} 
      {...props} 
    />
  )
}

interface EmailFormProps {
  onSubmit?: (email: string) => void
}

export function EmailSubscriptionForm({ onSubmit }: EmailFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    if (email && onSubmit) {
      onSubmit(email)
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="mt-6 space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm",
            "border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20",
            "text-foreground placeholder:text-muted-foreground",
            "transition-all duration-300 focus:outline-none",
            "text-sm"
          )}
        />
      </div>
      
      <motion.button
        type="submit"
        className={cn(
          "w-full px-6 py-3 rounded-lg font-medium text-sm",
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 focus:bg-primary/90",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "transition-all duration-300 transform",
          "hover:scale-[1.02] active:scale-[0.98]",
          "shadow-lg hover:shadow-xl"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Send
      </motion.button>
    </motion.form>
  )
}