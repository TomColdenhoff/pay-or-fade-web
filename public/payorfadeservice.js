function fadeSite() {
  let elements = document.getElementsByClassName("payorfade");
  if (elements.length === 0) {
    console.error(
      "PayOrFade: Couldn't find an element with payorfade as class."
    );
    return false;
  }

  let element = elements[0];
  let classes = element.classList;
  let id = "";
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].split("_")[0] === "payorfadeid") {
      id = classes[i].split("_")[1];
    }
  }

  fetch(`https://localhost:5001/api/fade/opacity/${id}`)
    .then(response => response.json())
    .then(commits => {
      element.style.opacity = commits.opacity;
    });

  return true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function tryFadeSite() {
  while (fadeSite() === false) {
    await sleep(2000);
    console.log("PayOrFade: Retrying...");
  }
}

tryFadeSite();
