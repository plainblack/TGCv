import { defineStore } from 'pinia';
import _ from 'lodash';
import { v4 } from 'uuid';
import { ouch } from '#ving/utils/ouch.mjs';

export default (behavior) => {
    const notify = useNotifyStore();

    const generate = defineStore(behavior.id || v4(), {
        state: () => ({
            props: behavior.props || {},
            meta: behavior.meta || {},
            options: behavior.options || {},
            links: behavior.links || {},
            related: behavior.related || {},
            warnings: behavior.warnings || [],
            query: { includeLinks: true, ...behavior.query },
            createApi: behavior.createApi,
            fetchApi: behavior.fetchApi,
        }),
        actions: {

            /**
             * A quick way to call an endpoint without directly setting up your own `useRest()` composable. The result then updates the local object.
            * 
            * Usage: `const result = user.call('post', user.links.self.href+'/send-reset-password', {os:'Windows'});`
            *
             * @param method `put`, `post`, `get` or `delete`.
             * @param url The endpoint to run this call on.
             * @param query An object containing query parameters to pass to this call.
             * @param options Modify the behavior of this call.
             * @returns A promise containing the response to the call.
             */
            async call(method, url, query = {}, options = {}) {
                const response = await useRest(url, {
                    query: _.defaultsDeep({}, this.query, query),
                    method,
                    suppressErrorNotifications: behavior.suppressErrorNotifications,
                });
                if (response.error) {
                    if (options?.onError) {
                        options?.onError(response.error);
                    }
                }
                else {
                    const data = response.data;
                    this.setState(data);
                    if (options?.onSuccess) {
                        options?.onSuccess(data);
                    }
                }
                return response;
            },

            /**
             * Creates a new record on the server and updates its attributes locally.
             * 
             * Usage: `await user.create()`
             * 
             * @param props An optional list of props for this record.
             * @param options An object that changes the behavior of this method.
             * @returns A promise containing the response.
             */

            async create(props, options) {
                const newProps = _.defaultsDeep({}, props, this.props);
                const response = await useRest(this.getCreateApi(), {
                    query: this.query,
                    method: 'post',
                    body: newProps,
                    suppressErrorNotifications: behavior.suppressErrorNotifications,
                });
                if (response.error) {
                    const data = response.data;
                    if (options?.onError)
                        options.onError(response.error);
                    if (behavior?.onError)
                        behavior.onError(response.error);
                }
                else {
                    const data = response.data;
                    this.setState(data);
                    if (options?.onCreate)
                        options.onCreate(data);
                    if (behavior?.onCreate)
                        behavior.onCreate(data);
                }
                return response;
            },

            /**
             * Removes a record from the server.
             * 
             * Usage: `await user.delete()`
             * 
             * @param options An object to change the behavior of this method.
             * @returns A promise that contains the response.
             */
            async delete(options = {}) {
                let message = "Are you sure?";
                if (this.props && typeof this.props == 'object' && "name" in this.props) {
                    message = "Are you sure you want to delete " + this.props.name + "?";
                }
                if (options.skipConfirm || confirm(message)) {
                    const response = await useRest(this.getSelfApi(), {
                        query: this.query,
                        method: 'delete',
                        suppressErrorNotifications: behavior.suppressErrorNotifications,
                    });
                    if (response.error) {
                        if (options?.onError)
                            options.onError(response.error);
                        if (behavior?.onError)
                            behavior.onError(response.error);
                    }
                    else {
                        const data = response.data;
                        if (options?.onDelete)
                            options.onDelete(data);
                        if (behavior?.onDelete)
                            behavior.onDelete(data);
                    }
                    return response;
                }
            },

            /**
             * Any warnings currently in the state will be displayed on screen to the user through the notifications system. Under normal circumstances you should never need to call this method directly.
             * 
             * Usage: `user.dispatchWarnings()`
             */
            dispatchWarnings() {
                if (this.warnings) {
                    for (const warning of this.warnings) {
                        document.dispatchEvent(
                            new CustomEvent("wing_warn", {
                                message: warning.message,
                            })
                        );
                        notify.warn(warning.message);
                    }
                }
            },

            /**
             * Frees the memory associated with this record. Be sure to also 
             * add something like `v-if="user.props?.id"` to a wrapping div to
             * avoid a Vue crash.
             * 
             * Usage: `onBeforeRouteLeave(() => user.dispose());`
             */
            dispose() {
                this.$reset();
                this.$dispose();
                const pinia = usePinia();
                delete pinia.state.value[this.$id];
            },

            /**
            * Fetches the configured object from the server.
            * 
            * Usage: `await user.fetch()`
            * 
            * @returns A promise containing a response.
            */
            async fetch() {
                const response = await useRest(this.getFetchApi(), {
                    query: this.query,
                    suppressErrorNotifications: behavior.suppressErrorNotifications,
                });
                if (response.error) {
                    if (behavior?.onError)
                        behavior.onError(response.error);
                }
                else {
                    const data = response.data;
                    this.setState(data);
                    if (behavior?.onFetch)
                        behavior.onFetch(data);
                }
                return response;
            },

            /**
             * Returns the configured endpoint for creating records of this kind or throws an error if it cannot.
             * 
             * Usage: `const url = user.getCreateApi()`
             * 
             * @returns An endpoint url.
             */
            getCreateApi() {
                if (this.createApi) {
                    return this.createApi;
                }
                else if (this.links?.base) {
                    return this.links.base.href;
                }
                notify.error('No createApi');
                throw ouch(401, 'No createApi');
            },

            /**
             * Returns the configured endpoint for fetching a record of this kind or throws an error if it cannot.
             * 
             * Usage: `const url = user.getFetchApi()`
             * 
             * @returns An endpoint url.
             */
            getFetchApi() {
                if (this.fetchApi) {
                    return this.fetchApi;
                }
                else if (this.links?.self) {
                    return this.links.self.href;
                }
                notify.error('No fetchApi');
                throw ouch(401, 'No fetchApi');
            },

            /**
             * Returns the configured endpoint for refetching the already fetched object or throws an error if it cannot.
             * 
             * Usage: `const url = user.getSelfApi()`
             * 
             * @returns An endpoint url.
             */
            getSelfApi() {
                if (this.links?.self) {
                    return this.links.self.href;
                }
                notify.error('No links.self');
                throw ouch(400, 'No links.self');
            },

            /**
             * Updates just a defined segment of a the record.
             * 
             * Usage: `await user.partialUpdate({realName : 'George'});
             * 
             * @param props The props to update
             * @param options An object that modifies the behavior of this method
             * @returns A promise that contains a response
             */
            async partialUpdate(props, options = {}) {
                const response = await useRest(this.getSelfApi(), {
                    query: this.query,
                    method: 'put',
                    body: props,
                    suppressErrorNotifications: behavior.suppressErrorNotifications,
                });
                if (response.error) {
                    if (options?.onError)
                        options.onError(response.error);
                    if (behavior?.onError)
                        behavior.onError(response.error);
                }
                else {
                    const data = response.data;
                    this.setState(data);
                    if (options?.onUpdate)
                        options.onUpdate(data);
                    if (behavior?.onUpdate)
                        behavior.onUpdate(data);
                }
                return response;
            },

            /**
             * Save a specific named prop back to the server.
            * 
            * Usage: `await user.save('username')`
             * 
             * @param name The name of a property to update
             * @param value Optionally specify a value to update in local memory before submitting to the server.
             * @returns A promise that contains a response
             */
            save: function (name, value) {
                const update = {};
                if (this.props && value === undefined) {
                    update[name] = this.props[name];
                }
                else if (value !== undefined) {
                    update[name] = value;
                }
                return this.partialUpdate(update);
            },

            /**
             * Updates the reactive state of all the data from a rest request into the local object and also dispatches any generated warnings. Generally you won't have to use this method directly.
             * 
             * Usage: `user.setState(response.data)`
             * 
             * @param result The data resulting from a Rest request to a Ving Record endpoint
             */
            setState(result) {
                this.props = result.props;
                this.links = result.links;
                this.meta = result.meta;
                this.options = result.options;
                this.related = result.related;
                this.warnings = result.warnings;
                this.dispatchWarnings();
            },

            /**
             * Put the current set of props of a specific record back to the server.
             * 
             * Usage: `await user.update()`
             * 
             * @param options An object that changes the behavior of this object
             * @returns 
             */
            update(options) {
                return this.partialUpdate(this.props, options);
            },

        }
    });

    return generate();
}