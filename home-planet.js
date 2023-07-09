const storyTimeline = gsap.timeline();

gsap.set("section.house", { opacity: 0 });
gsap.set("section.scene", { opacity: 0 });
gsap.set("section.scene img", {
  x: (index) => {
    return index * 100 + 300 + "vh";
  },
});

storyTimeline
  .to("header", {
    opacity: 0,
    delay: 3,
  })

  .addLabel("start")
  .to(
    "section.scene",
    {
      opacity: 1,
    },
    "start"
  )
  .to(
    "section.scene img",
    {
      x: "0vh",
      duration: 10,
      ease: "linear",
    },
    "start"
  )

  .addLabel("end")
  .to(
    "section.scene",
    {
      opacity: 0,
    },
    "end"
  )
  .to(
    "section.house",
    {
      opacity: 1,
    },
    "end"
  );

storyTimeline.pause();
let update;

window.addEventListener("scroll", () => {
  const pixels = window.pageYOffset;
  const currentTime = pixels / 300;

  cancelAnimationFrame(update);

  update = requestAnimationFrame(() => {
    storyTimeline.time(currentTime);
  });
});

const eyesTimeline = gsap.timeline({
  repeat: -1, // -1 = infinite
});

const eyeballs = document.querySelectorAll(
  "path#ball, path#ball_2, path#ball_3, path#ball_4, path#ball_5, path#ball_6"
);

eyesTimeline
  .set(eyeballs, { y: 0 })
  .to(eyeballs, {
    y: 7,
    duration: 0.25,
    delay: 2,
    stagger: 0.25,
  })
  .to(eyeballs, {
    y: 0,
    duration: 0.25,
    delay: 4,
  });

const hatTimeline = gsap.timeline({
  repeat: -1,
  repeatDelay: 4,
});

const hat = document.querySelector("g#hat");

hatTimeline
  .set(hat, { y: 0 })
  .to(hat, {
    y: -50,
    rotation: -10,
    duration: 0.25,
    delay: 1,
  })
  .to(hat, {
    y: 0,
    rotation: 0,
    duration: 0.5,
    delay: 0.1,
  });

const leftArmTimeline = gsap.timeline({
  repeat: -1,
});

const leftArm = document.querySelector("#left-arm");

leftArmTimeline
  .set(leftArm, { rotation: 0 })
  .to(leftArm, {
    rotation: 20,
    duration: 0.25,
    delay: 2,
  })
  .to(leftArm, {
    rotation: 0,
    duration: 0.25,
    delay: 2,
  });

const rightArmTimeline = gsap.timeline({
  repeat: -1,
});

const rightArm = document.querySelector("#right-arm");

rightArmTimeline
  .set(rightArm, { rotation: 0 })
  .to(rightArm, {
    rotation: -20,
    duration: 0.25,
    delay: 3,
  })
  .to(rightArm, {
    rotation: 0,
    duration: 0.25,
    delay: 2,
  });

const tvTimeline = gsap.timeline({
  repeat: -1,
});

const tvLight = document.querySelector("#tv-light");

let o = 0.75;

tvTimeline
  .set(tvLight, { opacity: o })
  .to(tvLight, {
    opacity: 1,
    duration: 1,
    delay: 0.5,
  })
  .to(tvLight, {
    opacity: o,
  })
  .to(tvLight, {
    opacity: 1,
    duration: 0.4,
    delay: 0.5,
  })
  .to(tvLight, {
    opacity: o,
  });

const label = document.querySelector("div.label");
label.style.opacity = 0;
const links = document.querySelectorAll("svg a");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    label.style.opacity = 1;
    label.innerHTML = link.getAttribute("data-label");

    gsap.to(links, {
      opacity: 0.25,
    });

    gsap.to(link, {
      opacity: 1,
    });
  });
  link.addEventListener("mouseleave", () => {
    label.style.opacity = 0;
    label.innerHTML = "Label";

    gsap.to(links, {
      opacity: 1,
    });
  });
});

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
});
