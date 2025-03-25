import React from "react";
import { Link } from "react-router-dom";
import "../styles/Posts.css";

const Posts = () => {
  const posts = [
    {
      id: 1,
      title: "Knowing as Inseparable from Doing",
      date: "March 25, 2024",
      content: `We treat pieces of knowledge as something to be acquired once and kept forever, preserved forever on a timeless mental shelf of some kind. But the reality that we can all attest to is that knowing requires diligent practice and constant maintenance.

      In other words, <a href="https://en.wikipedia.org/wiki/Situated_cognition" target="_blank" rel="noopener noreferrer">knowing is a skill</a>, like playing an instrument or playing chess, that can be honed with practice.

      How do we create tools for thought that support knowing as an active process?`
    },
    {
      id: 2,
      title: "Open Questions",
      date: "January 7, 2025",
      content: `Paul Graham has written that <a href="https://arc.net/l/quote/qywfpqso" rel="nofollow">great essays tell the reader something surprising about an important or relevant topic</a>, perhaps one <a href="https://arc.net/l/quote/hwnwuzbn" rel="nofollow">with wide breadth of applicability</a> in some way (chronological, fields of study, etc.).

      Assuming that knowledge is a strongly connected graph, he also writes that <a href="https://arc.net/l/quote/cwjqzbvx" rel="nofollow">it should be sufficient to start with any sufficiently interesting question</a>, and by exploring the subquestions instigated by that initial question you will inevitably arrive at an essay topic that is both interesting/surprising and important/relevant, ie. a great essay.

      These claims seem reasonable enough. Historically, great essays do indeed come from prolific essay writers, who usually begin somewhere arbitrary and eventually end up at the essay they always were supposed to write (or, the greatest essay that they can write).

      So, following this line of thinking, I will list the questions, however small or large, that have occupied me. Ideally, each of these questions is one day linked to a corresponding essay exploring it, or at least a link to the relevant answer that sated my curiosity about the question.

      Questions:
      - If you were given a year notice that you would be required to give a PhD-level presentation on a topic, and that you would be informed of the topic one month before the presentation, how should you best spend that year to prepare?
      - What is the best way to acquire both depth and breadth of knowledge about the world?
      - What is the best method for systematically creating new knowledge / having new ideas?
      - What does it mean to have good taste? Is good taste universal or timeless?
      - Are people born with an innate sense of taste? Can one learn taste?
      - Is it better for one's thinking to have breadth or depth?
      - How can we maximize expansion of knowledge, generally and individually?
      - What educational system is best for maximizing expansion of knowledge?
      - Is there a soul?
      - Is consciousness an emergent property? How does one define consciousness, and differentiate it from sentience?
      - Are societies conscious? Are ant hills composed of multiple or a single organism?
      - Is there really a subconscious? How would we be able to tell?
      - Is there free will? Are we slaves to chemicals, with only an illusion of self?
      - Is consciousness an inevitable evolved phenomenon? Will aliens have similar experiences of consciousness to ourselves, or completely different, or none at all?
      - Why are viruses considered unalive, while bacteria are considered alive?
      - When people experience a traumatic event that completely changes them, are they really the same person / should they be considered the same person?
      - Is it possible for humanity to live forever? What is preventing us from living longer?
      - How is human culture encoded genetically, if at all?
      - How can LLMs be constructed such that they also require very few samples to become fully able to generalize across all of human culture, knowledge, and language, and beyond?
      - Do words have inherent meaning outside of their contexts?
      - How correct or valid is the Sapir Whorf Hypothesis? Do languages generally cover the same latent space, or are there large swathes that are not shared by two different languages?
      - How much of meaning can be possibly encoded in language?
      - Does P = NP? What are the implications if so / if not?
      - How might we build biological computers with the same level of fidelity as evolved ones?
      - Is meaning just metaphors all the way down?
      - Can knowledge be retrieved from irreversible processes? From black holes? How? Is all information destined for destruction? How can we know?
      - Is it morally permissible to use mentally stimulating drugs? If yes, why are we not all taking Adderall all the time? Does it have downsides, or are we just being societally conservative?
      - Why do mind-altering drugs usually alter people's minds in describably similar ways? What is the qualitative difference between those states of being and the "normal" one?
      - Are political utopias possible in practice? If not, what makes them actually impossible to implement? If yes, how does one transition from a political non-utopia to a utopia?
      - Do political utopias require the social game to be perfect information games? Can they exist in imperfect information games?
      - Will climate change actually be an existential threat to the human species?
      - What, if any, obligation do we have to preserve biodiversity? Just for fun or aesthetic reasons? Haven't there been plenty of extinction events in the past?
      - Will AI be an existential threat to the human species?
      - When/How will we know if/when AI becomes conscious?
      - Is there anything that inherently separates human brains from artificial brains?
      - What, if any, qualitative differences exist between our lived experience and that of animals, or machines?
      - Why should we value human life over any other?
      - If people care about their pets, why don't they seem to care about animals raised for slaughter?
      - Is embodied experience required for conscious experience?
      - Is an internal monologue (inaccessible by others) required?
      - If we reconstructed a person atom for atom in a different place and then killed their original body, would it be the same body?
      - How does the Ship of Theseus paradox play into this?
      - Is our body an important part of our identity as a person?
      - Are we really the same person as the person we were ten years ago?
      - Does our experience of the world exist continuously, or discretely?
      - If discretely, what FPS is required for a person to be considered a continuous entity?
      - How is this related to theories/beliefs of eternal recurrence?
      - Quantum memory at the atomic or subatomic level?
      - Should children have the same rights as adults? Why or why not?
      - Why do things happen in twos? Is absence/presence inherent, or do we just experience dualities of things when there is actually more than that?
      - Are there infinitely many prime numbers? How do we know? What are the applications of prime number theory? Number theory? Group theory?
      - Does knowledge exist outside of our ability to know it?
      - Clearly, given Gödel.
      - Are books the most efficient way to store information / ideas long term? If not, what is? Books are certainly not the best way to teach information — then what is?
      - How might we make conceptual tools for thought that allow us to expand the space of thinkable thoughts?
      - Is the acceptable amount of bullshit a nonzero amount of bullshit?
      - Would the same optical illusions that trick humans also trick aliens?
      - Is aesthetic beauty (in proportions, composition, sounds, etc) universal across species/civilizations?
      - What is art? Can anything be art? What qualities are requirements to be art?
      - Is art subjective? If so, then what about timeless/objective art?
      - Are humans inherently evil, or inherently good? How would we know?
      - Do what degree should intentions matter when determining blame, guilt, or responsibility?
      - How:
      - How does Cryptography work? How is information encoded such that only the sender and receiver can access them even if the act of sending is public knowledge?
      - How do Quantum Computers work? Why are they more able to solve large problems then normal computers?
      - How did financial systems get to the place they are at today?
      - How does quantum electrodynamics work?
      - How does quantum tunneling work?
      - What does quantum mechanics imply about the nature of reality? How can we verify this empirically? Is the Copenhagen Interpretation correct?
      - Is FTL travel ever possible? What might this look like — how might it work?
      - How does the internet really work?`
    }
  ];

  return (
    <div className="posts-container">
      <div className="section-header">
        <span className="section-title">/ posts</span>
      </div>
      <p className="posts-intro">Here you can find a list of posts.</p>
      
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>{post.title}</h2>
              <p><em>{post.date}</em></p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;