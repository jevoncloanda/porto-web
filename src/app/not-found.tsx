import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="text-display font-semibold text-accent">404</p>
      <h1 className="mt-4 text-h1 font-semibold text-fg">Page not found</h1>
      <p className="mt-5 max-w-reading text-lead text-muted">
        That page does not exist, or it may have moved.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/">Back home</Button>
        <Button href="/projects" variant="secondary">
          Browse projects
        </Button>
      </div>
    </Container>
  );
}
