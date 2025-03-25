import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Postdetail.css";


const PostDetail = () => {
  const { id } = useParams();
  const posts = [
    {
      id: 1,
      title: "Knowing as Inseparable from Doing",
      date: "March 25, 2024",
      content: `We treat pieces of knowledge as something to be acquired once and kept forever, preserved forever on a timeless mental shelf of some kind. But the reality that we can all attest to is that knowing requires diligent practice and constant maintenance.
      This is evident in the way we approach learning new skills or subjects. At first, we may grasp the concepts quickly, but as time passes, our understanding begins to fade if we don't continue to engage with the material.<br><br>
      The same applies to our daily lives, where we must continually apply what we know to reinforce our understanding and make it a part of our being.<br><br>
      In other words, <a href="https://en.wikipedia.org/wiki/Situated_cognition" target="_blank" rel="noopener noreferrer">knowing is a skill</a>, like playing an instrument or playing chess, that can be honed with practice.

      How do we create tools for thought that support knowing as an active process?`
    },
    {
      id: 2,
      title: "Open Questions",
      date: "January 7, 2025",
      content: `Paul Graham has written that <a href="https://arc.net/l/quote/qywfpqso" rel="nofollow">great essays tell the reader something surprising about an important or relevant topic</a>, perhaps one <a href="https://arc.net/l/quote/hwnwuzbn" rel="nofollow">with wide breadth of applicability</a> in some way (chronological, fields of study, etc.).<br><br>

      Assuming that knowledge is a strongly connected graph, he also writes that <a href="https://arc.net/l/quote/cwjqzbvx" rel="nofollow">it should be sufficient to start with any sufficiently interesting question</a>, and by exploring the subquestions instigated by that initial question you will inevitably arrive at an essay topic that is both interesting/surprising and important/relevant, ie. a great essay.<br><br>

      These claims seem reasonable enough. Historically, great essays do indeed come from prolific essay writers, who usually begin somewhere arbitrary and eventually end up at the essay they always were supposed to write (or, the greatest essay that they can write).<br><br>

      So, following this line of thinking, I will list the questions, however small or large, that have occupied me. Ideally, each of these questions is one day linked to a corresponding essay exploring it, or at least a link to the relevant answer that sated my curiosity about the question.<br><br>

      <strong>Questions:</strong><br>
      <ol>
        <li>If you were given a year notice that you would be required to give a PhD-level presentation on a topic, and that you would be informed of the topic one month before the presentation, how should you best spend that year to prepare?</li>
        <li>What is the best way to acquire both depth and breadth of knowledge about the world?</li>
        <li>What is the best method for systematically creating new knowledge / having new ideas?</li>
        <li>What does it mean to have good taste? Is good taste universal or timeless?</li>
        <li>Are people born with an innate sense of taste? Can one learn taste?</li>
        <li>Is it better for one's thinking to have breadth or depth?</li>
        <li>How can we maximize expansion of knowledge, generally and individually?</li>
        <li>What educational system is best for maximizing expansion of knowledge?</li>
        <li>Is there a soul?</li>
        <li>Is consciousness an emergent property? How does one define consciousness, and differentiate it from sentience?</li>
        <li>Are societies conscious? Are ant hills composed of multiple or a single organism?</li>
        <li>Is there really a subconscious? How would we be able to tell?</li>
        <li>Is there free will? Are we slaves to chemicals, with only an illusion of self?</li>
        <li>Is consciousness an inevitable evolved phenomenon? Will aliens have similar experiences of consciousness to ourselves, or completely different, or none at all?</li>
        <li>Why are viruses considered unalive, while bacteria are considered alive?</li>
        <li>When people experience a traumatic event that completely changes them, are they really the same person / should they be considered the same person?</li>
        <li>Is it possible for humanity to live forever? What is preventing us from living longer?</li>
        <li>How is human culture encoded genetically, if at all?</li>
        <li>How can LLMs be constructed such that they also require very few samples to become fully able to generalize across all of human culture, knowledge, and language, and beyond?</li>
        <li>Do words have inherent meaning outside of their contexts?</li>
        <li>How correct or valid is the Sapir Whorf Hypothesis? Do languages generally cover the same latent space, or are there large swathes that are not shared by two different languages?</li>
        <li>How much of meaning can be possibly encoded in language?</li>
        <li>Does P = NP? What are the implications if so / if not?</li>
        <li>How might we build biological computers with the same level of fidelity as evolved ones?</li>
        <li>Is meaning just metaphors all the way down?</li>
        <li>Can knowledge be retrieved from irreversible processes? From black holes? How? Is all information destined for destruction? How can we know?</li>
        <li>Is it morally permissible to use mentally stimulating drugs? If yes, why are we not all taking Adderall all the time? Does it have downsides, or are we just being societally conservative?</li>
        <li>Why do mind-altering drugs usually alter people's minds in describably similar ways? What is the qualitative difference between those states of being and the "normal" one?</li>
        <li>Are political utopias possible in practice? If not, what makes them actually impossible to implement? If yes, how does one transition from a political non-utopia to a utopia?</li>
        <li>Do political utopias require the social game to be perfect information games? Can they exist in imperfect information games?</li>
        <li>Will climate change actually be an existential threat to the human species?</li>
        <li>What, if any, obligation do we have to preserve biodiversity? Just for fun or aesthetic reasons? Haven't there been plenty of extinction events in the past?</li>
        <li>Will AI be an existential threat to the human species?</li>
        <li>When/How will we know if/when AI becomes conscious?</li>
        <li>Is there anything that inherently separates human brains from artificial brains?</li>
        <li>What, if any, qualitative differences exist between our lived experience and that of animals, or machines?</li>
        <li>Why should we value human life over any other?</li>
        <li>If people care about their pets, why don't they seem to care about animals raised for slaughter?</li>
        <li>Is embodied experience required for conscious experience?</li>
        <li>Is an internal monologue (inaccessible by others) required?</li>
        <li>If we reconstructed a person atom for atom in a different place and then killed their original body, would it be the same body?</li>
        <li>How does the Ship of Theseus paradox play into this?</li>
        <li>Is our body an important part of our identity as a person?</li>
        <li>Are we really the same person as the person we were ten years ago?</li>
        <li>Does our experience of the world exist continuously, or discretely?</li>
        <li>If discretely, what FPS is required for a person to be considered a continuous entity?</li>
        <li>How is this related to theories/beliefs of eternal recurrence?</li>
        <li>Quantum memory at the atomic or subatomic level?</li>
        <li>Should children have the same rights as adults? Why or why not?</li>
        <li>Why do things happen in twos? Is absence/presence inherent, or do we just experience dualities of things when there is actually more than that?</li>
        <li>Are there infinitely many prime numbers? How do we know? What are the applications of prime number theory? Number theory? Group theory?</li>
        <li>Does knowledge exist outside of our ability to know it?</li>
        <li>Clearly, given Gödel.</li>
        <li>Are books the most efficient way to store information / ideas long term? If not, what is? Books are certainly not the best way to teach information — then what is?</li>
        <li>How might we make conceptual tools for thought that allow us to expand the space of thinkable thoughts?</li>
        <li>Is the acceptable amount of bullshit a nonzero amount of bullshit?</li>
        <li>Would the same optical illusions that trick humans also trick aliens?</li>
        <li>Is aesthetic beauty (in proportions, composition, sounds, etc) universal across species/civilizations?</li>
        <li>What is art? Can anything be art? What qualities are requirements to be art?</li>
        <li>Is art subjective? If so, then what about timeless/objective art?</li>
        <li>Are humans inherently evil, or inherently good? How would we know?</li>
        <li>Do what degree should intentions matter when determining blame, guilt, or responsibility?</li>
        <li><strong><span style="color: #00d1b2;">How:</span></strong></li>
        <ol>
          <li>How does Cryptography work? How is information encoded such that only the sender and receiver can access them even if the act of sending is public knowledge?</li>
          <li>How do Quantum Computers work? Why are they more able to solve large problems then normal computers?</li>
          <li>How did financial systems get to the place they are at today?</li>
          <li>How does quantum electrodynamics work?</li>
          <li>How does quantum tunneling work?</li>
          <li>What does quantum mechanics imply about the nature of reality? How can we verify this empirically? Is the Copenhagen Interpretation correct?</li>
          <li>Is FTL travel ever possible? What might this look like — how might it work?</li>
          <li>How does the speed of light limit our ability to travel through space?</li>
          <li>How does the internet really work?</li>
        </ol>
      </ol>`
    }
  ];

  const post = posts.find((post) => post.id === parseInt(id));

  return (
    <div className="post-detail-container">
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p><em>{post.date}</em></p>
          <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        </>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostDetail;
