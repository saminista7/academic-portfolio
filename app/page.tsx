import Hero from "@/components/Hero";
import ResearchStatement from "@/components/ResearchStatement";
import PublicationList from "@/components/PublicationList";
import AppliedWork from "@/components/AppliedWork";
import RecordSection from "@/components/RecordSection";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ResearchStatement />

      <section className="section" id="publications" aria-labelledby="publications-title">
        <div className="page">
          <p className="eyebrow">Publications</p>
          <Reveal>
            <h2 id="publications-title" className="section-title measure">
              Three peer-reviewed papers and one public dataset, each resolving to its DOI.
            </h2>
            <p className="lede measure">
              Filter or sort the list. Every figure quoted here is the figure published in the
              paper, and every record links out so it can be checked at source.
            </p>
          </Reveal>
          <PublicationList />
        </div>
      </section>

      <AppliedWork />
      <RecordSection />
      <Contact />
    </>
  );
}
