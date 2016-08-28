import R from 'ramda';
import { stream } from 'kefir';
import { nodeAdded, nodeRemoved } from './actions';

/**
 * Determines whether the node is relevant to stream consumers.
 *
 * @param {Node} node - Node to check.
 * @returns {boolean} Whether node is relevant to children$ streams.
 */
function isRelevantNode(node) {
    return !!(node.hasAttribute && node.hasAttribute('data-brk-container'));

}

/**
 * Stream of node additions and removals from the DOM.
 *
 * Filtered for relevance to subcomponents and formatted as an action.
 *
 * @type {Observable<T, S>}
 */
export default stream(emitter => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            console.log(mutation.target);
            Array.from(mutation.addedNodes)
                .forEach(R.pipe(nodeAdded(mutation.target), emitter.value));

            Array.from(mutation.removedNodes)
                .forEach(R.pipe(nodeRemoved(mutation.target), emitter.value));
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });

    return () => observer.disconnect();
})
    .filter(
        R.pipe(
            R.path(['payload', 'node']),
            isRelevantNode))
    .map(({ type, payload }) => {
        let { node, target } = payload;
        let key = node.getAttribute('data-brk-container');
        let parent = getContainerNode(node.parentNode) || getContainerNode(target);

        return {
            type,
            payload: { key, node, parent, target }
        };
    });

/**
 * Returns the container node of the provided node.
 *
 * @param {Node} parent - Parent node to check.
 * @returns {null|Node} Parent container node.
 */
function getContainerNode(parent) {
    if (!parent) {
        return null;
    }

    if (parent.hasAttribute('data-brk-container')) {
        return parent;
    }

    return getContainerNode(parent.parentNode);
}
