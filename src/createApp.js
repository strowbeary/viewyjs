import {patch, skip, currentElement} from "incremental-dom";
import LoadingScreen from "./components/Presentation/LoadingScreen";
import {View} from "./components/View/View";

export const createApp = (elementId, rootComponent) => {
    const render = () => {
        const mountingNode = document.getElementById(elementId);
        mountingNode.style.height = "100vh";
        mountingNode.style.background = "var(--background)";
        patch(mountingNode, () => rootComponent().render());
    }
    window.addEventListener("load", () => {
        render();
    });
    window.addEventListener("forceUpdate", () => {
        render();
    });
    return () => render();
};

export const forceUpdate = () => window.dispatchEvent(new CustomEvent("forceUpdate"));



export function component({name, data = async () => ({}), view = () => {}}) {
    let eventTarget = new EventTarget();
    let initializedData = null;
    let loading = true;

    function render(mountingNode, props) {
        try {
            patch(mountingNode, () => {
                if(initializedData && !loading) {
                    view.call(initializedData, ...props).render()
                } else {
                    LoadingScreen().render()
                }
            });
        } catch (e) {
            console.error(name, e);
        }
    }

    function reactify(data, onUpdate) {
        return new Proxy(data, {
            get(obj, prop) {
                return obj[prop];
            },
            set(obj, prop, value) {
                obj[prop] = value;
                onUpdate();
                return true;
            }
        });
    }

    function mount(props) {
        skip();
        eventTarget = new EventTarget();
        const mountingNode = currentElement();
        eventTarget.addEventListener("update", () => render(mountingNode, props));

        render(mountingNode, props)
        loading = true;
        data(...props).then(dataObj => {
            loading = false;
            initializedData = reactify(dataObj, () => eventTarget.dispatchEvent(new CustomEvent("update")));
            eventTarget.dispatchEvent(new CustomEvent("update"));
        });
    }


    return (...props) => View({
        render() {
            mount(props);
        }
    })
        .addClass(`component-${name}`)
}