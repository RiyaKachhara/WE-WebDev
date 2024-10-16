// Toggle the collapsible sections
document.querySelectorAll('.collapsible').forEach((collapsible) => {
    collapsible.addEventListener('click', function () {
        const content = this.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// Generate Table of Contents dynamically
const toc = document.querySelector("#toc ul");
let tocHTML = '';
let h1Counter = 0;
let h2Counter = 0;

document.querySelectorAll('h1, h2').forEach(header => {
    if (header.tagName === 'H1') {
        h1Counter++;
        h2Counter = 0; // Reset H2 counter when a new H1 appears
        tocHTML += `<li><a href="#${header.id}">${h1Counter}. ${header.innerText}</a></li>`;
    } else if (header.tagName === 'H2') {
        h2Counter++;
        tocHTML += `<ul><li><a href="#${header.id}">${h1Counter}.${h2Counter}. ${header.innerText}</a></li></ul>`;
    }
});

// Prevent adding the "Table of Contents" entry (if it exists)
const tableOfContentsId = 'toc'; // ID of your TOC section
const tableOfContentsHeader = document.querySelector(`h2#${tableOfContentsId}`);

if (tableOfContentsHeader) {
    const parent = tableOfContentsHeader.parentNode;
    if (parent) {
        parent.removeChild(tableOfContentsHeader); // Remove the header if needed
    }
}

// Update the Table of Contents in the HTML
toc.innerHTML = tocHTML;

// Smooth scrolling effect when clicking TOC links
document.querySelectorAll('#toc a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
