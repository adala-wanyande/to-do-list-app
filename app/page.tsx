import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button className={buttonVariants({ variant: "outline" })}>Click me</Button>
    </div>
  )
}
