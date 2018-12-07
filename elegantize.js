{

const BracketsE = class {

	// なんか定数宣言できなかったけどそんなもんなの
	get codePointA() {

		return 'A'.codePointAt(); // 65

	}
	get codePointZero() {

		return '0'.codePointAt(); // 48

	}

	get body() {

		return document.getElementById('body');

	}

	constructor(A0) {

		const [A, zero] = [...A0];
		this.A = A;
		this.zero = zero;
		this.shiftA = A.codePointAt() - this.codePointA;
		this.shiftZero = zero ? zero.codePointAt() - this.codePointZero : 0;
		this.container = this.addElement(this.body, 'div');
		this.textArea = this.addElement(this.container, 'textarea', {
		 disabled: 'disabled' 
		});
		this.copy = this.addElement(this.container, 'button', {
		 textContent: '←コピー',
		 disabled: 'disabled'
		}, {
		 click: this.copy
		});
		
	}

	addElement(parentNode, name, prop = {}, events = {}) {

		const node = parentNode.appendChild(
		 Object.assign(document.createElement(name), prop)
		);
		for (let trigger of Object.keys(events))
		 node.addEventListener(trigger, events[trigger]);

		return node;

	}

	conv(str) {

		this.textArea.value = str.replace(
		 /([0-9])|([A-Z])|([a-z])/g, (c, zero, A, a) => String.fromCodePoint(
		 c.codePointAt() + (++zero ? this.shiftZero : this.shiftA) - !!a * 6
		));
		this.copy.disabled = this.textArea.disabled = !this.textArea.value.length;

	}

	copy(e) {

		const textArea = e.target.previousSibling;
		textArea.select();
		document.execCommand('copy');
		textArea.blur();

	}

}

const bracketsEs = [
 '𝐀𝟎', '𝐴', '𝑨', '𝒜', '𝓐', '𝔄', '𝔸𝟘', '𝕬', '𝖠𝟢', '𝗔𝟬', '𝘈', '𝘼', '𝙰𝟶'
].map(A0 => new BracketsE(A0));
document.getElementById('in').addEventListener('change',
 e => bracketsEs.forEach(E => E.conv(e.target.value))
);

}