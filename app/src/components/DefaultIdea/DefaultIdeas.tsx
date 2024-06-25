import DefaultIdea from "./DefaultIdea";

const defaultIdeas = [
  {
    //idea: "Design database schema",
    moreContext: "I am feeling dizzy, what should I do?",
  },
  {
    // idea: "Give me code snippet",
    moreContext: "how to book an appointment?",
  },
  // { idea: "Tell me a joke", moreContext: "Tell me a joke" },
  {
    //  idea: "Design redux store",
    moreContext: "Why I am not able to sleep?",
  },
];

export default function DefaultIdeas({ visible = true }) {
  return (
    <div className={`row1 ${visible ? "block" : "hidden"}`}>
      <DefaultIdea ideas={defaultIdeas.slice(0, 2)} />
      <DefaultIdea
        ideas={defaultIdeas.slice(2, 4)}
        myclassNames="hidden md:visible"
      />
    </div>
  );
}
