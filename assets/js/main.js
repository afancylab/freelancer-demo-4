"use strict";
class Kuntu {
    constructor() {
        this.childrenMinWidth = 15;
        this.childrenMinHeight = 15;
        this.childrenMaxWidth = 100;
        this.childrenMaxHeight = 100;
        const left = document.getElementById('left');
        const right = document.getElementById('right');
        right.addEventListener('dragover', function (ev) { return ev.preventDefault(); });
        this.render();
        const swapNodes2 = function (nodeA, nodeB) {
            const parentA = nodeA.parentNode;
            const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
            if (nodeB.parentNode)
                nodeB.parentNode.insertBefore(nodeA, nodeB);
            if (parentA)
                parentA.insertBefore(nodeB, siblingA);
        };
        right.ondrop = (ev) => {
            ev.preventDefault();
            let dropElement = null;
            if (ev.dataTransfer)
                dropElement = document.getElementById(ev.dataTransfer.getData('text'));
            let sw = true;
            for (const e of right.children) {
                sw = false;
                if (dropElement)
                    swapNodes2(dropElement, e);
            }
            if (dropElement && sw)
                right.appendChild(dropElement);
        };
    }
    render() {
        const left = document.getElementById('left');
        for (const e of left.children) {
            e.draggable = true;
            e.ondragstart = (ev) => {
                ev.dataTransfer.setData('text/plain', ev.target.id);
            };
        }
    }
    moveChild(sourceId, targetId = null) {
        const left = document.getElementById('left');
        const right = document.getElementById('right');
        const source = document.getElementById(sourceId);
        const target = (targetId) ? document.getElementById(targetId) : null;
        if (source && targetId === null) {
            for (const e of right.children) {
                left.appendChild(e);
            }
            right.appendChild(source);
            return true;
        }
        else if (source && target) {
            function swapNodes(n1, n2) {
                const p1 = n1.parentNode;
                const p2 = n2.parentNode;
                let i1, i2;
                if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) {
                    return;
                }
                for (let i = 0; i < p1.children.length; i++) {
                    if (p1.children[i].isEqualNode(n1)) {
                        i1 = i;
                    }
                }
                for (let i = 0; i < p2.children.length; i++) {
                    if (p2.children[i].isEqualNode(n2)) {
                        i2 = i;
                    }
                }
                if (p1.isEqualNode(p2) && i1 && i2 && i1 < i2) {
                    i2++;
                }
                if (i1)
                    p1.insertBefore(n2, p1.children[i1]);
                if (i2)
                    p2.insertBefore(n1, p2.children[i2]);
            }
            swapNodes(source, target);
            return true;
        }
        return false;
    }
    setLayout(position, size) {
        const base = document.querySelector('[mainLayout="base"]');
        const low = document.querySelector('[mainLayout="low"]');
        const high = document.querySelector('[mainLayout="high"]');
        if ((position === 'top' || position === 'bottom') && size >= this.childrenMinHeight && size <= this.childrenMaxHeight) {
            low.style.width = 'auto';
            low.style.height = `${size}%`;
        }
        else if ((position === 'left' || position === 'right') && size >= this.childrenMinWidth && size <= this.childrenMaxWidth) {
            low.style.height = 'auto';
            low.style.width = `${size}%`;
        }
        base.setAttribute('layoutPosition', position);
    }
    showChildren(state) {
        let e = document.getElementById('childrenContainer');
        if (e) {
            if (state)
                e.style.display = "flex";
            else
                e.style.display = "none";
        }
    }
    showLayover(state) {
        let e = document.getElementById('layoverContainer');
        if (e) {
            if (state)
                e.style.display = "block";
            else
                e.style.display = "none";
        }
    }
    fillBlack() {
        const right = document.getElementById('right');
        const left = document.getElementById('left');
        for (const e of right.children) {
            left.appendChild(e);
        }
    }
}
var kuntu = new Kuntu();
function getUniqueId(digit) {
    return (Math.round(Math.random() * 100000000).toString(digit)) + (Date.now().toString(digit)) + (Math.round(Math.random() * 100000).toString(digit));
}
function addC5() {
    const left = document.getElementById('left');
    const uniqueId1 = 'c_' + getUniqueId(35);
    let e = `<div id="${uniqueId1}" class="  min-h-[8rem] h-full select-none text-center cursor-pointer bg-blue-700">` +
        '<img src="assets/icon/menu.svg" alt="icon" class="ml-auto" >' +
        `${uniqueId1}` +
        '</div>';
    left.insertAdjacentHTML('beforeend', e);
    kuntu.render();
}
function removeC5() {
    const left = document.getElementById('left');
    const length = left.children.length;
    if (length > 0) {
        left.children[length - 1].remove();
        kuntu.render();
    }
}
//# sourceMappingURL=main.js.map