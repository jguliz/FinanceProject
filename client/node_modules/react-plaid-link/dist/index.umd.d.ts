/// <reference types="react" />
import React from "react";
interface CommonPlaidLinkOptions {
    // Displayed once a user has successfully linked their account
    clientName: string;
    // The Plaid API environment on which to create user accounts.
    env: string;
    // The Plaid products you wish to use, an array containing some of connect,
    // auth, identity, income, transactions, assets, liabilities
    product: Array<string>;
    // A function that is called when a user has successfully connecter an Item.
    // The function should expect two arguments, the public_key and a metadata object
    onSuccess: Function;
    // An array of countries to filter institutions
    countryCodes?: Array<string>;
    // A local string to change the default Link display language
    language?: string;
    // Your user's associated email address - specify to enable all Auth features.
    // Note that userLegalName must also be set.
    userEmailAddress?: string;
    // Your user's legal first and last name – specify to enable all Auth features.
    // Note that userEmailAddress must also be set.
    userLegalName?: string;
    // Specify a webhook to associate with a user.
    webhook?: string;
    linkCustomizationName?: string;
    accountSubtypes?: {
        [key: string]: Array<string>;
    };
    oauthNonce?: string;
    oauthRedirectUri?: string;
    oauthStateId?: string;
    paymentToken?: string;
    // A callback that is called when a user has specifically exited Link flow
    onExit?: Function;
    // A callbac that is called when the Link module has finished loading.
    // Calls to plaidLinkHandler.open() prior to the onLoad callback will be
    // delayed until the module is fully loaded.
    onLoad?: Function;
    // A callback that is called during a user's flow in Link.
    onEvent?: Function;
} // Either the publicKey or the token field must be configured
// Either the publicKey or the token field must be configured
type PlaidLinkOptions = (CommonPlaidLinkOptions & {
    // The public_key associated with your account; available from
    // the Plaid dashboard (https://dashboard.plaid.com)
    publicKey: string;
    token?: string;
}) | (CommonPlaidLinkOptions & {
    // Specify an item add token to launch link in normal mode.
    //
    // Specify an existing user's public token to launch Link in update mode.
    // This will cause Link to open directly to the authentication step for
    // that user's institution.
    token: string;
});
type PlaidLinkPropTypes = PlaidLinkOptions & {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};
interface Plaid {
    open: Function;
    exit: Function;
    create: Function;
    destroy: Function;
}
declare global {
    interface Window {
        Plaid: Plaid;
    }
}
/**
 * This hook loads Plaid script and manages the Plaid Link creation for you.
 * You get easy open & exit methods to call and loading & error states.
 *
 * This will destroy the Plaid UI on un-mounting so it's up to you to be
 * graceful to the user.
 *
 * A new Plaid instance is created every time the token and products options change.
 * It's up to you to prevent unnecessary re-creations on re-render.
 */
declare const usePlaidLink: (options: PlaidLinkOptions) => {
    error: ErrorEvent | null;
    ready: boolean;
    exit: Function;
    open: Function;
};
declare const PlaidLink: React.FC<PlaidLinkPropTypes>;
export { usePlaidLink, PlaidLink };
