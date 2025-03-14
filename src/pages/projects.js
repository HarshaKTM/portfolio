import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Projects() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to home page with projects section
    router.push('/#projects');
  }, [router]);
  
  return (
    <div>
      <Head>
        <title>Redirecting to Projects | Harsha Kumarasingha</title>
        <meta name="description" content="View Harsha Kumarasingha's GitHub projects and portfolio work." />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Redirecting to projects...</p>
      </div>
    </div>
  );
} 