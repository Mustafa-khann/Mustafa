# Portfolio author notes

This file is an editing worksheet. It is not published on the website.

The application asks for personal contributions, challenges, lessons, and results,
and discourages AI-written application text. The public pages now identify solo
ownership and describe the implementation supported by existing content and source.
Mustafa should review the revised prose in his own voice before submitting.

## Confirmed directly by Mustafa

- All ten portfolio projects were solo projects he built.
- HermesX: the ESP32 approach needed more compute; the planned vision/ROS/SLAM/3D
  path-planning stack failed within available resources; he pivoted to GPS with a
  Raspberry Pi and a flight-control unit.
- HermesX: tried Kinect instead of a stereo camera and Pi 3 instead of Pi 5;
  custom-designed electronics mounts and housings; attached a servo-powered
  robotic clamp for payload handling.
- HermesX successfully flew to a supplied latitude/longitude, landed, dropped a
  package, and returned to the takeoff position.
- Anky was his first robotics project, with online tutorials as learning resources.
  Servo calibration and writing IK from scratch were major learning experiences.
- TinyOS: he wrote the filesystem, scheduling, display, keyboard-input, and GPU
  communication systems in C, learning low-level systems programming.
- The resume analyzer is not deployed; its unconfirmed date is omitted.
- The robot experiments and measured results in the research articles were
  experiments he performed. The summaries now identify the experimental work.

## Personal details still needed

Keep notes concrete. An unsuccessful test, discarded design, or unfinished part
is useful when the outcome and its cause are clear. Do not invent numbers.

| Project | What to add in your own words |
| --- | --- |
| HermesX | Optional supporting evidence: a delivery recording, payload, distance, flight time, trial count, and remaining limitations. The full delivery-and-return demonstration is confirmed. |
| Anky | A concrete calibration or IK example, what a pick-and-place test achieved, tutorial credits/links, and whether the printed design was original or adapted. The first-project context and learning are now included. |
| TinyOS | A specific bug and its diagnosis, and a demo showing what ran in QEMU or on a board. Your account of writing the systems and learning low-level programming is now included. |
| Tiny Compiler | One parsing or evaluation bug, an input that exposed it, your fix, and what you learned about language implementation. |
| MNIST in C | What the 90% result measured (training, validation, or Kaggle), the run configuration, one real training/debugging difficulty, and your takeaway. |
| Urdu text generation | Corpus, your actual generator/discriminator setup, generated samples, how training went, and what you learned. A repository or notebook would help. |
| Rusty Transformer | A tensor/mask issue you encountered, how you checked the forward pass, and what you learned. State whether any model was trained. |
| Resume analyzer | Which model/version you demonstrated, your original build date, a real feedback example, any users, and what you learned from integrating the local model. |
| Sign language in C | The evaluation split/run behind 73%, attempts to improve it, and your conclusion about the plateau. |
| CNN from scratch | The exact repository/version for this project, the implemented layers, a real gradient/debugging issue, test outputs, and a lesson. |

## Dates to reconcile

Repository creation dates establish when code was published, not when work began.
Do not replace build dates with them automatically.

- The resume analyzer formerly said March 2023; the public repository was created
  July 25, 2024 and refers to Llama 3 / Phi-3. The public date is now omitted until
  the original build date is confirmed. Non-deployment status is confirmed.
- HermesX currently says May 2023; the newly supplied account mentions considering
  a Raspberry Pi 5. Clarify whether there were later revisions to the project.
- Other repository creation dates differ from project dates; these may represent
  later publication. Confirm the dates before application submission.

## Evidence and scope checked on September 22, 2026 (UTC)

Public GitHub metadata and source were inspected, without running the project
code or independently reproducing hardware tests / accuracy results.

| Repository | Stars | Forks |
| --- | ---: | ---: |
| [TinyOS](https://github.com/Mustafa-khann/TinyOS) | 277 | 24 |
| [Tiny-Compiler](https://github.com/Mustafa-khann/Tiny-Compiler) | 109 | 14 |
| [MNIST digit recognizer](https://github.com/Mustafa-khann/MNIST-Digit-Recognizer-in-C) | 86 | 2 |
| [Sign language recognizer](https://github.com/Mustafa-khann/MNIST-Sign-Language-Recognizer-in-C) | 38 | 1 |

- Tiny Compiler's public code evaluates an AST using an interpreter; the former
  native-code-generation claim was removed.
- TinyOS has a Makefile with QEMU run/debug targets. No physical-board validation
  was inferred from those targets.
- The MNIST digit program prints training accuracy and exports Kaggle predictions;
  the 90% figure's evaluation split is not established by that program.
- [Rusty Transformer](https://github.com/Mustafa-khann/Rusty-Transformer) contains a
  forward-pass example, not a trained-model benchmark.
- The [resume analyzer](https://github.com/Mustafa-khann/Llama-3-8B-powered-Resume-Analyzer)
  source uses React, Flask, PyPDF2, and a local OpenAI-compatible endpoint. The
  checked backend selects Phi-3 via LM Studio. Frontend `file` and backend `resume`
  upload names differ. These findings concern the public checkout, not necessarily
  a later local version Mustafa demonstrated.
- The missing `CNN-Architecture-from-Scratch-in-C` link was removed. The existing
  [Sign Language CNN repository](https://github.com/Mustafa-khann/MNIST-Sign-Language-Recognizer-CNN-in-C)
  is linked as related work; it was not assumed to be the same project/version.
- The placeholder `yourusername` URL for Urdu text generation was removed.
- Research experiment ownership is now confirmed. Adding original recordings,
  experiment logs, trial counts, code, and the baseline setup would strengthen
  those pages without changing the recorded results.
