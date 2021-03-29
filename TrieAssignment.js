class Node {

    constructor(val) {
        this.val = val;
        this.allNodes = [];
    }

    addNode(node) {
        this.allNodes.push(node);
    }

}

var wordException = "Invalid word";

class Trie {


    constructor(word) {
        this.init(word);
    }

    init(word) {
        if (!word || !!!word || word.length === 0)
            throw wordException;
        this.head = new Node(word.charAt(0));
        word = word.substring(1);
        if (word.length > 1) {
            let newNode = new Node(word.charAt(0));

            this.head.addNode(newNode);
            this.addWord(newNode, word.substring(1));
        } else if (!!!word) {
            let newNode = new Node(word.charAt(0));
            this.head.addNode(newNode);
        }

    }

    insert(word) {
        if (!this.checkValid(word))
            throw wordException;

        let flag = false;
        word = word.substring(1);

        if (word.length > 0) {
            let lst = this.head.allNodes.filter(n => n.val === word.charAt(0));

            if (lst.length > 0) {
                this.handleInsert(lst[0], word.substring(1));
                flag = true;
            }
        }
        if (!flag) {
            let newNode = new Node(word.charAt(0));
            this.head.addNode(newNode);
            this.addWord(newNode, word.substring(1));
        }
    }


    addWord(node, word) {
        let currentNode = node;
        while (word.length > 0) {
            let nextNode = new Node(word.charAt(0));
            currentNode.addNode(nextNode);
            currentNode = nextNode;
            word = word.substring(1);
        }
    }

    handleInsert(node, word) {
        //breaking condition
        if (word.length === 1) {
            if (node.allNodes.length > 0) {
                let lst = node.allNodes.filter(n => n.val === word.charAt(0));
                if (lst.length > 0)
                    return;
            }
            let newNode = new Node(word.charAt(0));
            node.addNode(newNode);
            return;
        }

        let flag = false;

        let lst = node.allNodes.filter(n => n.val === word.charAt(0));
        if (lst.length > 0) {
            flag = true;
            this.handleInsert(lst[0], word.substring(1));
        }

        if (!flag) {
            let newNode = new Node(word.charAt(0));
            node.addNode(newNode);
            this.addWord(newNode, word.substring(1));
        }
    }

    search(word) {
        if (!this.checkValid(word))
            throw wordException;

        return this.searchWord(this.head, word);
    }

    searchWord(node, word) {
        //breaking condition
        if (word.length === 1) {
            return word.charAt(0) === node.val;
        }

        if (word.charAt(0) === node.val) {
            let lst = node.allNodes.filter(n => n.val === word.charAt(1));
            if (lst.length > 0)
                return this.searchWord(lst[0], word.substring(1));

        }
        return false;
    }

    /**
     * 
     * @param word
     * @return
     * @throws Exception
     */
    remove(word) {
        if (!this.checkValid(word))
            throw wordException;

        let currentNode = this.head;
        let branch = this.head;
        let lastChar = ' ';
        if (this.search(word)) {
            word = word.substring(1);
            while (word.length > 0) {
                let lst = currentNode.allNodes.filter(n => n.val === word.charAt(0));
                if (lst.length > 0) {
                    if (currentNode.allNodes.length > 1) {
                        branch = currentNode;
                        lastChar = word.charAt(0);
                    }
                    currentNode = lst[0];
                }
                word = word.substring(1);
            }
        }
        let lst = branch.allNodes.filter(n => n.val === lastChar);
        if (lst.length > 0)
            return branch.allNodes.splice(lst[0], 1);
        return false;
    }

    checkValid(word) {
        return word && !!!word || !(word.length === 0) && this.head.val === word.charAt(0);
    }
}

var ALL_NAMES = ["Amit", "Amil", "Amir", "Amira", "Avira", "Aml", "Aharon", "Aviahu", "Avri", "Anan"];

class main {

    static testTrie(trie) {
        try {
            console.log("\n-------------------------------------------------\n");
            ALL_NAMES.forEach(word=> console.log(word + " exist? " + trie.search(word)))
            console.log("\n-------------------------------------------------\n");
            console.log("-----------After remove Amit and Avira-----------");
            trie.remove("Amit");
            trie.remove("Avira");
            ALL_NAMES.forEach(word=> console.log(word + " exist? " + trie.search(word)))
            console.log("\n-------------------------------------------------\n");

        } catch (error) {
            console.log(error.message);
        }
    }


    static hardCoded() {
        let t = null;
        try {
        t = new Trie(ALL_NAMES[0]);
        ALL_NAMES.forEach(word => t.insert(word))
        }catch(error) {
            console.log(error.message);
        }
        return t;
    }
}

let trie = main.hardCoded();
main.testTrie(trie);


