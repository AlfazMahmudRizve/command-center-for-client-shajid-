import React from 'react';
import { createRoot } from 'react-dom/client';
import { SidebarUI } from '../components/extension/sidebar-ui';

// Avoid rendering on the start page itself if possible
// We can check if the title or some meta tag matches our start page
// But explicit check is safer if we knew the extension ID, for now we just render everywhere.

const ID = 'sheriff-command-bridge';

if (!document.getElementById(ID)) {
    const host = document.createElement('div');
    host.id = ID;
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: 'open' });
    const root = createRoot(shadow);

    root.render(<SidebarUI />);
}
