function startApp() {
  // Your entire app should not necessarily be coded inside this 
  // single function (though there's no penalty for that), 
  // so create and use/call additional functions from here

  // pls remove the below and make some magic in here!
  // DOM Elements
  const btn = document.querySelector("#btn");
  const copyBtn = document.querySelector("#copyBtn");
  const stats = document.querySelectorAll(".stats");
  let scrambledWords = "";
  let changeInTime = "";

  //Setting year on the DOM
  document.querySelector("#year").innerHTML = new Date().getFullYear();

  // Copy text function
  const copyText = () => {
    if (!scrambledWords) return;
    navigator.clipboard.writeText(scrambledWords);
    copyBtn.textContent = "Copied";
  };

  // disable Buttons when the inputs are empty
  const disableBtn = () => {
    const words = document.querySelector("#words").value;
    const scramble = document.querySelector("#scramble").value;
    let a = words.trim().length == 0 ? false : true;
    let b = scramble.trim().length == 0 ? false : true;

    if (!a || !b) {
      document
        .querySelectorAll("button")
        .forEach((item) => item.classList.add("disabled"));
      resetValues();
    } else if (a && b) {
      document
        .querySelectorAll("button")
        .forEach((item) => item.classList.remove("disabled"));
    }
  };

  // Resetting values when input value changes
  const resetValues = () => {
    copyBtn.textContent = "Copy";
    stats[0].innerHTML = "";
    stats[1].innerHTML = "";
    stats[2].innerHTML = "";
    stats[3].innerHTML = "";
    output.textContent = "";
  };

  // scramble Words function
  const scrambleWords = () => {
    let initialTime = new Date().getTime();
    // DOM Elements
    let words = document.querySelector("#words").value;
    const scramble = document.querySelector("#scramble").value;
    let replaceWith = document.querySelector("#replace-with").value;
    replaceWith = replaceWith == "" ? "*" : replaceWith;
    const output = document.querySelector("#output");

    if (words.length < 1 || scramble.length < 1) {
      copyBtn.removeEventListener("click", copyText);
      return;
    }

    let splitedWords = words.split(scramble);
    scrambledWords = splitedWords.join(replaceWith);
    let replacedWordsLength =
      splitedWords.length - 1 > 0 ? splitedWords.length - 1 : 0;

    // Time computation
    let finalTime = new Date().getTime();
    changeInTime = (finalTime - initialTime) / 1000;

    // Displaying stats to the DOM
    stats[0].innerHTML = `<p>Number of words scanned: <span class="stat">${words.trim().split(" ").length
      }</span></p>`;
    stats[1].innerHTML = `<p>Number of characters scanned: <span class="stat">${words.trim().split("").length
      }</span></p>`;
    stats[2].innerHTML = `<p>Number of word(s) scrambled: <span class="stat">${replacedWordsLength}</span></p>`;
    stats[3].innerHTML = `<p>Time taken (Seconds): <span class="stat">${changeInTime}</span></p>`;
    output.textContent = scrambledWords;

    // Adding click event to copy button
    copyBtn.addEventListener("click", copyText);
  };

  btn.addEventListener("click", scrambleWords);
  document.querySelector("#scramble").addEventListener("keyup", () => {
    disableBtn();
    resetValues();
  });
  document.querySelector("#words").addEventListener("keyup", () => {
    disableBtn();
    resetValues();
  });

  // Randomize color
  setInterval(() => {
    const colorRand = Math.ceil(Math.random() * 10);
    const color = [
      "orange",
      "red",
      "yellow",
      "blue",
      "gold",
      "tan",
      "white",
      "#ddd",
    ];

    document.querySelector("#nav-title").style.color = color[colorRand];
  }, 2000);

  // Script written by Franklin Ominyi (Altschooler) for Circle 182
};

// ======= DO NOT EDIT ============== //
export default startApp;
  // ======= EEND DO NOT EDIT ========= //