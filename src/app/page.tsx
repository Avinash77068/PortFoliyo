import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { links, siteUrl } from "@/data/site";
import { allSkills } from "@/data/skills";

/**
 * The GitHub section reads live public data, so the page is prerendered and
 * refreshed every six hours rather than rendered per request.
 */
export const revalidate = 21600;

const [currentRole] = experience;
const [degree] = education;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      url: siteUrl,
      image: `${siteUrl}/profile.jpg`,
      jobTitle: currentRole.role,
      description: profile.summary,
      email: `mailto:${links.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      worksFor: {
        "@type": "Organization",
        name: currentRole.company,
        url: currentRole.companyUrl,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: degree.institution,
      },
      knowsAbout: allSkills.map((skill) => skill.name),
      sameAs: [links.github, links.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${profile.name} — Portfolio`,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: `${profile.name} | Frontend Developer Portfolio`,
      description: profile.summary,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      inLanguage: "en-IN",
    },
  ],
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Expertise />
        <GitHubSection />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Escaped per the Next.js JSON-LD guidance. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
