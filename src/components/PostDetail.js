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
    },
    {
      id: 3,
      title: "Why Physical AI (Robotics) is Going to Revolutionize Industrialism",
      date: "Mar 17 2025",
      content: `
        <p>Lately, I've been turning over this idea in my head: physical AI; especially robotics; is about to flip industrialism on its head, and we're living through the start of it. This isn't some far-off vision anymore; it's happening right now, and it's hard not to get excited about what's unfolding. I've been digging into some books that have shaped how I see this; Walter Isaacson's <em>Elon Musk</em> and Jeffrey Liker's <em>The Toyota Way</em>; and they've given me a lot to chew on. Let me walk you through why I think this is such a big deal.</p>

        <div style="text-align: center; margin: 20px 0;">
          <img src="/assets/factory.jpeg" alt="Modern factory with robotic automation" style="max-width: 100%; height: auto;" />
        </div>

        <p>Imagine a factory where the work never stops; not because people are grinding themselves into the ground, but because robots are on the clock 24/7. They don't need breaks or sleep; they just keep going, pushing productivity to a level that feels almost unreal. In <em>Elon Musk</em>, Isaacson quotes Musk telling his SpaceX team, "All requirements should be treated as recommendations," pushing them to strip away anything that didn't absolutely have to be there, guided only by the laws of physics. That's the kind of mindset robots bring to the table; relentless precision, no fluff. Liker's <em>The Toyota Way</em> echoes this in a different way: "Toyota's production system is designed to eliminate waste in all its forms; overproduction, waiting time, unnecessary transport, excess inventory, and defects." Robots could take that philosophy and run with it, creating a flow where every move adds value, nothing less.</p>

        <p>Now, I'll be honest; setting up a robotic workforce isn't cheap. The upfront hit can sting. But over time, the savings start stacking up in ways that make you wonder why we didn't do this sooner. Isaacson tells a story about Musk questioning why a pair of cranes for the Falcon 9 would cost $2 million. He dug into the Air Force's safety regs, found most were outdated, and got them revised; bringing the price down to $300,000. That's the kind of cost-cutting robotics can unlock, challenging every assumption to save big. Liker puts it more methodically in <em>The Toyota Way</em>: "Automation at Toyota is not about replacing people but about supporting them to do their jobs better. By reducing waste and improving quality, we lower costs over time, even if the initial investment is high." It's like planting a tree today that shades you for decades.</p>

        <p>Safety's another piece that gets me. Robots can take on the jobs that put people in harm's way; handling toxic stuff or working in brutal conditions; and suddenly, the workplace feels less like a risk. Liker writes, "One of Toyota's core beliefs is respect for people. Machines take on the heavy, dangerous tasks so humans can focus on problem-solving and creativity." That's not just practical; it's human. Musk's approach is less sentimental but just as impactful. Isaacson describes him envisioning Starships stacked by machines in Boca Chica, a setup where robots handle the heavy lifting; literally; keeping people out of the danger zone.</p>

        <p>What's really wild is how flexible these robots are getting. They're not stuck doing one thing forever; they can switch gears when the world shifts. Musk, in a meeting about the Robotaxi, called it "a historically mega-revolutionary product" that "will transform everything," according to Isaacson. He sees a future where machines adapt instantly to new tasks, like a fleet of Starships ready for anything. Liker's take in <em>The Toyota Way</em> is quieter but just as powerful: "Standardized work is the foundation of the Toyota Production System," ensuring consistency but leaving room for kaizen; continuous improvement. Robots could blend that adaptability with precision, pivoting on a dime without losing their edge.</p>

        <p>Quality's where they shine, too. Robots don't get sloppy or distracted; they deliver the same high standard every time. Liker nails this: "Standardized work ensures that every product meets the same high standard, every time, with no variation." Musk's obsession with precision shows up in Isaacson's account of him pushing Tesla toward perfection, where even tiny flaws get hunted down. Robots in industry could do that at scale; flawless output, day after day.</p>

        <p>But it's not just about perfecting what we've got; it's about dreaming bigger. Robotics is cracking open new possibilities we hadn't even considered. Musk's Robotaxi vision—"People will be talking about this moment in a hundred years," he told his team—hints at how far this could go. Liker's <em>The Toyota Way</em> ties innovation to the ground level: "Toyota encourages kaizen at every level. Workers on the line are empowered to stop production if they see a problem, and their ideas drive innovation from the ground up." Robots could amplify that, merging human creativity with machine logic to push boundaries.</p>

        <p>And then there's the data. These robots are packed with sensors, soaking up information we can use to get smarter about everything we do. Musk loves this stuff—Isaacson writes, "Musk loved the idea of sensors everywhere. 'With Starlink and Tesla, we're drowning in data,' he told his team. 'That's our edge—using it to make decisions faster than anyone else.'" Toyota's lean system thrives on feedback too, though it's more about people watching the line than machines spitting out numbers. Either way, robots turn factories into data goldmines, sharpening every choice we make.</p>

        <p>So here's where I land: physical AI and robotics aren't just tweaking industrialism—they're rewriting it from the ground up. The wins are huge: efficiency that boggles the mind, savings that pile up over time, workplaces that feel safer, flexibility to roll with the punches, quality you can bank on, innovation that sparks new ideas, and data that keeps us ahead of the curve. Musk's wild ambition and Toyota's grounded wisdom both point to the same truth—this is the future, and it's already started. I can't wait to see where it takes us.</p>
      `
    },
    {
      id: 4,
      title: "The Future of AI: Navigating the Technological Horizon",
      date: "Mar 26 2025",
      content: `
        <p>The future of artificial intelligence stands as one of the most profound technological frontiers of our time—a subject that has captivated researchers, philosophers, and technologists for decades. As we venture deeper into the 21st century, <span style="color: #00d1b2">the evolution of AI has accelerated at a pace that would have seemed implausible even to the most optimistic futurists of previous generations.</span> In this extensive exploration, I'll delve into the multifaceted landscape of emerging AI technologies, their potential societal impacts, and the ethical considerations that must guide our journey forward.</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="/assets/ai-future.jpg" alt="Futuristic AI visualization" style="max-width: 100%; height: auto;" />
        </div>
        
        <p>Perhaps the most revolutionary development in recent AI history has been the meteoric rise of generative artificial intelligence. These systems—trained on vast datasets encompassing human creativity across millennia—have demonstrated an astonishing capacity to produce content that blurs the line between human and machine creation. <span style="color: #00d1b2">The implications of this technology extend far beyond simple automation; we're witnessing nothing less than a fundamental reconfiguration of creative processes across disciplines.</span></p>
        
        <p>Consider the case of visual arts: tools like DALL-E, Midjourney, and Stable Diffusion have democratized image creation to an unprecedented degree. A person with no formal artistic training can now generate museum-quality imagery through carefully crafted prompts. This represents both an extraordinary opportunity for creative expression and a profound challenge to our traditional understanding of artistry. <span style="color: #00d1b2">The philosophical question looms large: if an AI can create a painting indistinguishable from one produced by a human master, what does this tell us about the nature of creativity itself?</span> Is there something quintessentially human about artistic expression, or have we simply been engaging in pattern recognition and recombination all along—processes that machines can now emulate with startling fidelity?</p>
        
        <p>In the realm of music, generative AI is composing symphonies, creating pop hits, and even mimicking the distinctive styles of legendary musicians. Companies like OpenAI have developed models capable of generating original compositions that capture the essence of specific genres or artists. <span style="color: #00d1b2">This technology raises fascinating questions about musical authorship and the future of composition.</span> Will tomorrow's composers function more as curators and prompt engineers, guiding AI systems toward particular aesthetic outcomes rather than creating every note themselves? The boundary between human and machine creativity becomes increasingly permeable with each technological advancement.</p>
        
        <p>Perhaps most relevant to my own medium, text generation has undergone a transformation that borders on the miraculous. Large language models (LLMs) like GPT-4 can now produce prose, poetry, code, and analysis that frequently passes for human-written content. <span style="color: #00d1b2">These systems have moved beyond simple pattern matching to demonstrate capabilities that suggest a form of understanding—albeit one fundamentally different from human comprehension.</span> The implications for fields ranging from journalism to legal document preparation are profound and still unfolding. As these systems continue to evolve, we may need to reconsider fundamental assumptions about written communication and knowledge work.</p>
        
        <p>The underlying architectures powering AI systems have undergone several paradigm shifts in recent years, each bringing substantial improvements in capability and efficiency. The transformer architecture, introduced in 2017, catalyzed a revolution in natural language processing that continues to reverberate throughout the field. <span style="color: #00d1b2">This innovation enabled models to process text with a contextual understanding previously thought impossible, leading directly to the development of increasingly sophisticated language models.</span></p>
        
        <p>More recently, we've witnessed the emergence of multimodal AI systems capable of processing and generating content across different forms of media simultaneously. These models can understand the relationship between text and images, audio and video, creating a more holistic form of machine perception that more closely mimics human cognitive processes. <span style="color: #00d1b2">For instance, systems can now generate images based on textual descriptions, describe the content of photographs in natural language, or even create videos from written scenarios.</span></p>
        
        <p>The computational efficiency of these models has also improved dramatically. Techniques like quantization, distillation, and sparse attention mechanisms have reduced the resources required to deploy advanced AI systems, making them accessible on consumer devices rather than requiring massive data centers. <span style="color: #00d1b2">This democratization of AI capability represents a significant shift in how these technologies will integrate into everyday life.</span></p>
        
        <p>Perhaps most intriguing is the development of few-shot and zero-shot learning capabilities. Traditional machine learning required extensive training on labeled examples specific to a particular task. Modern foundation models can now perform tasks they were never explicitly trained to do, generalizing from their broad training to solve novel problems with minimal additional instruction. <span style="color: #00d1b2">This emergent capability suggests a form of flexibility previously thought to be uniquely human.</span></p>
        
        <p>As AI systems become more capable and computationally efficient, we're witnessing their integration into the fabric of everyday life—a phenomenon sometimes called "ambient intelligence." This represents a fundamental shift from AI as a distinct technology to AI as an omnipresent layer enhancing virtually every aspect of our technological infrastructure.</p>
        
        <p>Consider the evolution of virtual assistants. What began as simple voice-activated systems capable of performing basic tasks has evolved into sophisticated ambient computing platforms that understand context, remember preferences, and anticipate needs. <span style="color: #00d1b2">These systems increasingly fade into the background of our awareness while simultaneously becoming more deeply integrated into our daily routines.</span> The voice assistant that once required explicit activation is evolving into an ambient presence that understands when intervention would be helpful and when to remain silent.</p>
        
        <p>Smart homes represent another frontier of ambient intelligence. Beyond simple automation of lighting or temperature control, these environments are becoming responsive ecosystems that learn patterns of behavior and adapt accordingly. <span style="color: #00d1b2">A truly intelligent home might adjust lighting based not just on time of day but on the specific activities being performed, the mood of the occupants (detected through voice patterns or facial expressions), or even anticipated needs based on historical patterns.</span></p>
        
        <p>In healthcare, AI is enabling continuous monitoring and analysis that was previously impossible. Wearable devices equipped with AI can detect subtle changes in vital signs that might indicate developing health issues, potentially allowing for intervention before symptoms become apparent. <span style="color: #00d1b2">This shift from reactive to preventative medicine represents one of the most promising applications of ambient intelligence.</span></p>
        
        <p>As AI systems become more powerful and pervasive, the ethical questions surrounding their development and deployment take on increased urgency. These questions span domains from privacy and surveillance to bias and discrimination, from economic displacement to existential risk. <span style="color: #00d1b2">How we navigate these challenges will determine whether AI serves as a force for human flourishing or exacerbates existing inequalities and creates new forms of harm.</span></p>
        
        <p>The issue of algorithmic bias has received significant attention, and rightly so. AI systems trained on historical data inevitably reflect and potentially amplify the biases present in that data. Without careful attention to this problem, automated decision systems risk perpetuating discrimination in areas like hiring, lending, criminal justice, and healthcare. <span style="color: #00d1b2">Addressing this challenge requires not just technical solutions but a deep engagement with questions of fairness, representation, and social justice.</span></p>
        
        <p>Privacy concerns become increasingly acute as AI systems process more personal data and generate increasingly accurate models of individual behavior and preferences. The same capabilities that enable personalized services also create unprecedented opportunities for surveillance and manipulation. <span style="color: #00d1b2">Establishing appropriate boundaries around data collection and use represents one of the central ethical challenges of the AI era.</span></p>
        
        <p>Perhaps most profound are questions about autonomy and human agency. As AI systems make more decisions on our behalf—from small choices like what content we see to potentially life-altering determinations about medical treatment or financial opportunities—how do we ensure that human autonomy is preserved? <span style="color: #00d1b2">The convenience of automation must be balanced against the fundamental human need for self-determination and meaningful choice.</span></p>
        
        <p>Navigating the future of AI requires a multidisciplinary approach that brings together technical expertise, ethical reasoning, and democratic deliberation. The decisions we make about how to develop and deploy these technologies will shape society for generations to come.</p>
        
        <p>Technical research must continue to address challenges like alignment (ensuring AI systems act in accordance with human values), interpretability (making AI decision-making transparent and understandable), and safety (preventing unintended harmful consequences). <span style="color: #00d1b2">These are not merely engineering problems but deeply interdisciplinary challenges that require collaboration across fields.</span></p>
        
        <p>Policy frameworks must evolve to address the unique challenges posed by AI. Existing regulatory approaches designed for previous technologies may be inadequate for systems that can adapt, learn, and make autonomous decisions. <span style="color: #00d1b2">Developing appropriate governance mechanisms requires both technical understanding and democratic legitimacy.</span></p>
        
        <p>Perhaps most importantly, the conversation about AI's future must include diverse perspectives. The benefits and risks of these technologies will not be distributed equally, and those most vulnerable to potential harms must have a voice in determining how AI is developed and deployed. <span style="color: #00d1b2">This includes ensuring global equity in AI development, preventing the concentration of AI capability in a small number of corporations or nations.</span></p>
        
        <p>As we stand at this technological crossroads, it's worth reflecting on what makes us distinctly human. AI systems may increasingly match or exceed human capabilities in specific domains, from game playing to image recognition to language generation. <span style="color: #00d1b2">Yet the essence of humanity encompasses more than discrete capabilities—it includes consciousness, subjective experience, moral agency, and forms of social connection that remain uniquely human.</span></p>
        
        <p>The most promising vision of AI's future is not one where machines replace humans but where human-AI collaboration enables achievements neither could accomplish alone. This requires designing AI systems that complement human strengths rather than simply mimicking human capabilities, <span style="color: #00d1b2">creating partnerships that enhance rather than diminish human potential.</span></p>
        
        <p>The future of AI is neither predetermined nor beyond our influence. Through thoughtful development, ethical deployment, and inclusive governance, we can shape these technologies to serve human flourishing. <span style="color: #00d1b2">The choices we make today will echo through generations, determining whether artificial intelligence becomes one of humanity's greatest achievements or one of our most profound challenges.</span> The responsibility—and the opportunity—belongs to all of us.</p>
      `
    },
    {
      id: 5,
      title: "The Strategic Imperative for Domestic Manufacturing Renaissance",
      date: "Mar 26 2025",
      content: `The decline of domestic manufacturing capacity represents one of the most significant economic shifts of the past half-century. While globalization has brought many benefits, the <span style="color: #00d1b2">hollowing out of our manufacturing base has created vulnerabilities that have become increasingly apparent.</span> I believe we need a renaissance in domestic manufacturing—not out of nostalgia, but as a strategic imperative for innovation, resilience, and economic vitality.
      
      There's a dangerous misconception that manufacturing is somehow separate from innovation—that we can design here and build elsewhere without consequences. The reality is far more complex. When manufacturing and R&D become geographically separated, innovation suffers in subtle but profound ways.
      
      <p>The knowledge gained on factory floors—the tacit understanding of materials, processes, and constraints—feeds back into design and engineering in ways that are difficult to quantify but impossible to replace. <span style="color: #00d1b2">Engineers who regularly walk manufacturing lines think differently about product development than those who never see their designs built.</span> This proximity between design and production creates a virtuous cycle of innovation that's difficult to maintain across oceans and time zones.</p>
      
      <p>Consider the semiconductor industry, where the most advanced manufacturing has largely moved overseas. As we've lost production capacity, we've also seen a gradual erosion of the ecosystem of suppliers, specialized knowledge, and engineering talent that enables cutting-edge development. <span style="color: #00d1b2">The path from laboratory breakthrough to mass production becomes longer and more uncertain when the manufacturing expertise exists elsewhere.</span></p>
      
      <p>The pandemic exposed the fragility of global supply chains with unprecedented clarity. From personal protective equipment to semiconductor chips, we discovered that just-in-time global supply networks optimize for cost under ideal conditions but break down catastrophically under stress.</p>
      
      <p><span style="color: #00d1b2">Building domestic manufacturing capacity isn't about economic isolationism—it's about creating resilient systems that can withstand shocks.</span> A balanced approach that includes domestic production capacity for critical goods provides insurance against disruption, whether from pandemics, natural disasters, or geopolitical tensions.</p>
      
      <p>This resilience has national security implications as well. Defense capabilities depend on secure supply chains for everything from advanced materials to electronic components. When critical manufacturing exists entirely overseas, it creates vulnerabilities that potential adversaries could exploit.</p>
      
      <p>Manufacturing has historically provided pathways to middle-class stability for workers without advanced degrees. As these jobs have disappeared, we've seen growing inequality and regional economic divergence. <span style="color: #00d1b2">While not all manufacturing jobs of the future will resemble those of the past, modern manufacturing facilities create diverse employment opportunities across skill levels.</span></p>
      
      <p>Advanced manufacturing plants anchor economic ecosystems that extend far beyond their walls. They support networks of suppliers, service providers, and complementary businesses that multiply their economic impact. These ecosystems create opportunities for entrepreneurship and innovation that benefit entire regions.</p>
      
      <p>Perhaps most importantly, manufacturing provides economic dignity—the opportunity to create tangible value and see the direct results of one's work. <span style="color: #00d1b2">This sense of contribution and purpose represents something our service economy has struggled to replace.</span></p>
      
      <p>The environmental case for domestic manufacturing may seem counterintuitive, but it's compelling. Global shipping accounts for approximately 3% of worldwide carbon emissions. Manufacturing closer to points of consumption can significantly reduce this transportation footprint.</p>
      
      <p>Moreover, domestic manufacturing operates under environmental regulations that are often more stringent than those in developing nations. <span style="color: #00d1b2">Rather than exporting pollution along with production, we can build cleaner factories that set global standards for sustainable manufacturing.</span></p>
      
      <p>The transition to green energy and transportation will require massive manufacturing capacity—from solar panels and wind turbines to batteries and electric vehicles. Building this capacity domestically ensures we capture both the environmental and economic benefits of this transition.</p>
      
      <p>Rebuilding manufacturing capacity requires a coordinated approach across public and private sectors. Strategic investments in infrastructure, workforce development, and R&D can create the conditions for manufacturing renaissance. <span style="color: #00d1b2">Tax policies that encourage capital investment in production facilities and regulatory frameworks that provide certainty without unnecessary burden are equally important.</span></p>
      
      <p>Educational systems must evolve to provide the technical skills modern manufacturing requires, from robotics and automation to advanced materials and digital systems. Community colleges and technical training programs have vital roles to play in building these capabilities.</p>
      
      <p>Perhaps most importantly, we need to challenge the narrative that manufacturing decline is inevitable—a natural evolution of advanced economies. <span style="color: #00d1b2">The examples of Germany, Japan, and South Korea demonstrate that high-wage countries can maintain vibrant manufacturing sectors through strategic specialization, automation, and workforce development.</span></p>
      
      <p>The manufacturing plants we build today will shape our economic and strategic position for decades to come. They represent not just production capacity but innovation capability, economic opportunity, and national resilience. The time to invest in this future is now.</p>`
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
