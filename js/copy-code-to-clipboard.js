const codeBlocks = document.querySelectorAll("pre.giallo code[data-lang]");

for (const codeBlock of codeBlocks) {
    const preBlock = codeBlock.parentElement;
    const hasLineNumbers = codeBlock.querySelector(".giallo-ln") !== null;
    let content;

    if (hasLineNumbers) {
        // Giallo uses spans with .giallo-l for lines and .giallo-ln for line numbers.
        // Extract text from each line span, skipping the line number spans.
        content = [...codeBlock.querySelectorAll(".giallo-l")]
            .map((line) => {
                const clone = line.cloneNode(true);
                clone.querySelectorAll(".giallo-ln").forEach((ln) => ln.remove());
                return clone.textContent;
            })
            .join("");
    } else {
        content = codeBlock.innerText.split("\n").filter(Boolean).join("\n");
    }

    if (navigator.clipboard !== undefined) {
        const copyButton = document.createElement("button");
        copyButton.classList.add("copy-button");
        copyButton.innerText = "Copy";

        copyButton.addEventListener("click", () => {
            copyButton.innerText = "Copied!";
            navigator.clipboard.writeText(content);
            setTimeout(() => copyButton.innerText = "Copy", 1000);
        });

        preBlock.prepend(copyButton);
    }
}
