import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/mindtrace-article.css';
import { useMindtraceCharts } from '../hooks/useMindtraceCharts';
import { useArticleMeta } from '../hooks/useArticleMeta';

const HERO = '/research/mindtrace/image-1.png';
const PHASES = '/research/mindtrace/image-2.png';

const MindTraceArticle: React.FC = () => {
  const c1 = useRef<HTMLCanvasElement>(null);
  const c2 = useRef<HTMLCanvasElement>(null);
  const c3 = useRef<HTMLCanvasElement>(null);
  const c4 = useRef<HTMLCanvasElement>(null);
  const c5 = useRef<HTMLCanvasElement>(null);

  useMindtraceCharts({ c1, c2, c3, c4, c5 });

  useArticleMeta({
    title: 'Introducing MindTrace — Momentum Research',
    description:
      'A cognitive profile model built from implicit student feedback signals—latency, hesitation, and error clustering.',
    imagePath: HERO,
  });

  return (
    <div className="mindtrace-article">
      <div className="wrapper">
        <Link to="/research" className="research-back">
          ← Research Index
        </Link>

        <div className="meta-bar">
          <span className="meta-logo">Momentum Research</span>
          <span className="meta-dot">·</span>
          <span className="meta-tag">Research</span>
        </div>

        <div className="article-hero">
          <div className="article-hero-text">
            <h1>
              Introducing MindTrace: a cognitive profile model that learns how you think, built from
              implicit student feedback signals
            </h1>
            <p className="byline article-hero-byline">
              Momentum Research Team &nbsp;·&nbsp; May 2026
            </p>
          </div>
          <div className="article-hero-media">
            <img
              src={HERO}
              alt="MindTrace — A cognitive model built from how you study"
              className="thumbnail"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>

        <p>
          Most study tools treat every student the same. You get a flashcard wrong, the app schedules
          it sooner. You get it right, the app backs off. That is the entirety of the personalization
          loop in most systems available today, and it has remained largely unchanged for decades.
        </p>

        <p>
          MindTrace is our attempt to move past that ceiling. Rather than asking students to rate
          their own confidence or waiting for a binary right/wrong signal, MindTrace builds a
          cognitive profile from the behavioral residue of each session: response latency, hesitation
          patterns, session timing, error clustering, and the sequential structure of what trips a
          student up. None of this requires the student to do anything differently. The signal is
          already there. MindTrace reads it.
        </p>

        <p>
          This post describes the theoretical foundation behind MindTrace, what distinguishes it from
          existing approaches, and what the data suggests about where this method is headed.
        </p>

        <h2>The problem with explicit feedback</h2>

        <p>
          The dominant paradigm in adaptive learning systems today relies on explicit feedback. The
          student is asked to self-report confidence, select a difficulty rating, or is scored on a
          discrete right/wrong basis. These signals are then fed into a scheduling algorithm, most
          commonly a variant of SM-2 or its successors, which adjusts review intervals accordingly.
        </p>

        <p>The limitation of this approach is not the algorithm. It is the signal.</p>

        <p>
          Explicit feedback is noisy by design. Students systematically overestimate their own recall
          during review, a well-documented phenomenon sometimes referred to as the fluency illusion.
          A student who has seen a concept three times in a session will often rate their confidence
          high, even when their delayed recall is poor. The feedback being collected does not reflect
          actual memory encoding. It reflects momentary familiarity.
        </p>

        <p>
          Implicit signals behave differently. Response latency correlates more reliably with
          long-term retention than self-reported confidence does. The pattern of which concepts
          cluster together in a student&apos;s error profile reveals interference effects that a simple
          difficulty rating cannot capture. Session drop-off timing tells you something about
          cognitive load that no explicit input ever will.
        </p>

        <Figure
          label="Figure 1"
          title="Implicit vs explicit signals — profile accuracy over sessions"
          sub="Implicit behavioral signals build a more accurate cognitive profile faster than explicit user-reported feedback"
          legend={
            <>
              <span>
                <span className="legend-dot" style={{ background: '#D4537E' }} />
                Implicit signals (MindTrace)
              </span>
              <span>
                <span
                  className="legend-dot"
                  style={{ background: '#F4C0D1', border: '1px dashed #D4537E' }}
                />
                Explicit feedback only
              </span>
            </>
          }
          chart={<canvas ref={c1} role="img" aria-label="Line chart showing implicit signals reaching 91% profile accuracy by session 10 vs explicit feedback plateauing at 63%" />}
          height={240}
          caption="Profile accuracy measured as deviation from ground-truth cognitive state across simulated learner cohorts."
        />

        <p>
          As shown in Figure 1, a model trained on implicit behavioral signals reaches meaningful
          profile accuracy significantly faster than one relying on explicit feedback alone, and
          continues to compound accuracy over subsequent sessions rather than plateauing.
        </p>

        <h2>How MindTrace works</h2>

        <p>
          MindTrace operates as a background inference layer. During each study session, it observes
          the following signals without any input from the student:
        </p>

        <p>
          <strong>Response latency.</strong> How long a student pauses before answering a card.
          Latency distributions vary meaningfully between concepts a student genuinely knows versus
          concepts they are reconstructing in real time.
        </p>

        <p>
          <strong>Error clustering.</strong> Which concepts fail together. Correlated failures often
          point to a shared underlying gap rather than isolated weaknesses, and scheduling them
          independently misses the relationship entirely.
        </p>

        <p>
          <strong>Session cadence.</strong> What time of day sessions occur, how long they run, and
          where within a session accuracy degrades. Cognitive performance follows real temporal
          patterns that most apps ignore entirely.
        </p>

        <p>
          <strong>Sequential hesitation.</strong> A student who answers card A correctly but then
          hesitates on card B two cards later may be exhibiting interference from A. Standard
          algorithms treat these as independent events.
        </p>

        <p>
          These signals are aggregated across sessions to build a vector representation of how a
          given student encodes, retains, and retrieves information. That vector is the cognitive
          profile. It does not tell you what a student knows. It tells you how they know things, and
          more usefully, how they forget them.
        </p>

        <Figure
          label="Figure 2"
          title="Generic model vs personalized cognitive model — performance divergence"
          sub="Personalization compounds over time. The gap widens with every session."
          legend={
            <>
              <span>
                <span className="legend-dot" style={{ background: '#D4537E' }} />
                MindTrace personalized model
              </span>
              <span>
                <span className="legend-dot" style={{ background: '#F4C0D1' }} />
                Generic one-size-fits-all model
              </span>
            </>
          }
          chart={<canvas ref={c2} role="img" aria-label="Area chart showing MindTrace model reaching 89% vs generic model at 61% by week 8" />}
          height={240}
          caption="Performance score reflects accuracy on delayed recall tasks administered outside of the study session."
        />

        <p>
          Figure 2 shows the performance divergence between a generic scheduling model and a
          personalized cognitive model over eight weeks. The gap is negligible in the first week and
          substantial by the eighth, which reflects a core property of implicit profiling: it
          requires observation time to accumulate signal, but compounds meaningfully once it does.
        </p>

        <h2>The Day 1 to Day 28 arc</h2>

        <p>
          The most visible representation of how MindTrace develops over time is what we call the
          three-phase arc.
        </p>

        <p>
          On Day 1, MindTrace has observed a single session. The profile is sparse. Scheduling
          decisions at this stage are not meaningfully different from a generic baseline.
        </p>

        <p>
          By Day 14, the profile has accumulated enough signal to begin distinguishing this
          student&apos;s specific interference patterns, their reliable strengths, and the conditions
          under which their accuracy degrades.
        </p>

        <p>
          By Day 28, the cognitive profile has reached a level of resolution that allows MindTrace to
          make scheduling decisions no generic model could replicate, because they depend on
          behavioral patterns that are specific to this student and invisible to any system that does
          not track them.
        </p>

        <div className="figure">
          <p className="figure-label">Figure 3</p>
          <p className="figure-title">Cognitive profile sharpening — Day 1, Day 14, Day 28</p>
          <p className="figure-sub">
            Three core dimensions become measurably sharper as MindTrace observes more sessions
          </p>
          <img src={PHASES} alt="" className="phases-img" />
          <div className="legend">
            <span>
              <span className="legend-dot" style={{ background: 'rgba(212,83,126,0.3)' }} />
              Day 1
            </span>
            <span>
              <span className="legend-dot" style={{ background: 'rgba(212,83,126,0.6)' }} />
              Day 14
            </span>
            <span>
              <span className="legend-dot" style={{ background: '#D4537E' }} />
              Day 28
            </span>
          </div>
          <div className="chart-wrap" style={{ height: 260 }}>
            <canvas
              ref={c3}
              role="img"
              aria-label="Grouped bar chart showing recall speed, knowledge gap detection, and session personalization improving from day 1 to day 28"
            />
          </div>
          <p className="figure-caption">
            Scores normalized across a cohort of simulated learners. Each dimension measured
            independently per session batch.
          </p>
        </div>

        <h2>Accelerating the timeline</h2>

        <p>Twenty-eight days is a meaningful milestone, not a ceiling.</p>

        <p>
          The reason traditional systems require extended observation windows is that they work with
          sparse, low-resolution signals. Right/wrong on each card, repeated across sessions, takes
          time to accumulate statistical significance at the individual concept level.
        </p>

        <p>
          Because MindTrace reads higher-bandwidth implicit signals from every session, the profile
          accumulates faster. Early evidence from our internal modeling suggests that MindTrace
          reaches profile maturity comparable to what traditional systems achieve at Day 28 in
          approximately nine days under typical usage patterns.
        </p>

        <Figure
          label="Figure 4"
          title="Time to full cognitive profile — standard approach vs MindTrace"
          sub="MindTrace's implicit signal model reaches profile maturity approximately 3x faster"
          legend={
            <>
              <span>
                <span className="legend-dot" style={{ background: '#D4537E' }} />
                MindTrace
              </span>
              <span>
                <span
                  className="legend-dot"
                  style={{ background: '#F4C0D1', border: '1px dashed #D4537E' }}
                />
                Standard approach (28-day baseline)
              </span>
            </>
          }
          chart={
            <canvas
              ref={c4}
              role="img"
              aria-label="Line chart showing MindTrace reaching profile maturity by day 9 vs standard approach at day 28"
            />
          }
          height={240}
          caption="Profile maturity defined as the point at which scheduling decisions diverge meaningfully from population-level defaults."
        />

        <p>
          This is not a marginal improvement. A student who begins using MindTrace two weeks before an
          exam reaches a fully personalized experience before their study window is even half over.
          The system is most useful precisely when students need it most, during compressed
          high-stakes preparation periods rather than long-horizon review.
        </p>

        <h2>Where MindTrace sits relative to existing tools</h2>

        <p>
          The current landscape of student-facing study tools can be broadly characterized along two
          dimensions: how deeply personalized the experience is, and how much of that
          personalization is driven by implicit behavioral data versus explicit user input.
        </p>

        <p>
          Anki provides powerful scheduling with essentially no implicit personalization. Quizlet
          offers a polished experience but treats all users identically at the algorithmic level.
          Duolingo incorporates some adaptive elements but operates primarily on explicit performance
          data and is scoped to language learning only. General-purpose AI tools are not designed
          for learning retention at all.
        </p>

        <Figure
          label="Figure 5"
          title="Competitive positioning — personalization depth vs implicit signal usage"
          sub="MindTrace leads on both dimensions. No competitor at consumer scale occupies the same position."
          legend={
            <>
              <span>
                <span className="legend-dot" style={{ background: '#D4537E' }} />
                Implicit signal usage
              </span>
              <span>
                <span className="legend-dot" style={{ background: 'rgba(212,83,126,0.3)' }} />
                Personalization depth
              </span>
            </>
          }
          chart={
            <canvas
              ref={c5}
              role="img"
              aria-label="Horizontal bar chart comparing MindTrace, Duolingo, Anki, Quizlet, and Notion AI"
            />
          }
          height={300}
          caption="Scores based on published feature documentation and behavioral modeling research. MindTrace scores reflect theoretical target architecture."
        />

        <p>
          The upper-right quadrant of that space, high personalization driven by implicit signals, is
          currently unoccupied by any tool operating at consumer scale in the student market.
          MindTrace is designed to occupy that position.
        </p>

        <h2>What this means for students</h2>

        <p>
          The practical effect of a well-resolved cognitive profile is not just better scheduling. It
          is a study experience that gets more efficient the longer you use it, adapts to your actual
          cognitive patterns rather than a population average, and surfaces the right material at the
          right time without requiring you to manage the system at all.
        </p>

        <p>
          Most students do not need more study time. They need better signal about how they are
          actually retaining what they are studying. MindTrace is built on the premise that the signal
          is already there in every session, and that reading it carefully is enough to change the
          outcome.
        </p>

        <h2>What comes next</h2>

        <p>The immediate development priorities for MindTrace are threefold.</p>

        <p>
          First, reducing the cold-start window further. Nine days is a meaningful improvement over
          twenty-eight, but we believe profile resolution can be accelerated more aggressively with
          better initial session design and richer signal capture from early interactions.
        </p>

        <p>
          Second, extending the profile beyond flashcard performance. Response patterns in
          longer-form study tasks, practice problems, and reading sessions carry implicit signals
          that MindTrace does not yet incorporate. These are the next data sources we are working
          toward.
        </p>

        <p>
          Third, making the profile legible to the student. Right now MindTrace operates entirely in
          the background. We are exploring whether surfacing elements of the cognitive profile to
          students, in a form they can act on, improves outcomes further or introduces noise.
        </p>

        <hr />

        <p className="footer-note">
          Momentum Research publishes periodic reports on the science and engineering behind our
          learning infrastructure. For questions or correspondence, visit{' '}
          <a href="https://mntm.ca">mntm.ca</a>.
        </p>
      </div>
    </div>
  );
};

function Figure({
  label,
  title,
  sub,
  legend,
  chart,
  height,
  caption,
}: {
  label: string;
  title: string;
  sub: string;
  legend: React.ReactNode;
  chart: React.ReactNode;
  height: number;
  caption: string;
}) {
  return (
    <div className="figure">
      <p className="figure-label">{label}</p>
      <p className="figure-title">{title}</p>
      <p className="figure-sub">{sub}</p>
      <div className="legend">{legend}</div>
      <div className="chart-wrap" style={{ height }}>
        {chart}
      </div>
      <p className="figure-caption">{caption}</p>
    </div>
  );
}

export default MindTraceArticle;
