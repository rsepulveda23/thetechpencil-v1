import { notFound } from 'next/navigation'

export default function ClinicPost() {
  // Placeholder template for Clinic posts
  // In a full implementation this would fetch by slug
  if (!true) return notFound()
  return (
    <article className="prose dark:prose-invert">
      <h1>Task title (in plain English)</h1>
      <p className="lead">What you will do and what you should expect.</p>
      <h2>Steps</h2>
      <p>Follow these steps in order. If something fails, stop and tell us where.</p>
      <h2>Caveats</h2>
      <p>List the limits and privacy notes in simple terms.</p>
      <h2>Outcome</h2>
      <p>Describe the result and what to measure.</p>
    </article>
  )
}

