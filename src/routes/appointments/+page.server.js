export const load = async (serverLoadEvent) => {
    try {
        const { fetch } = serverLoadEvent;
        const res = await fetch(`https://appointments-fe6c.onrender.com/api/v1/appointments/`);
        const items = await res.json();

        const appointments = await Promise.all(
            items.data.map(async (url) => {
                const appointmentRes = await fetch(`https://appointments-fe6c.onrender.com/api/v1${url}`);
                if (!appointmentRes.ok) {
                    throw new Error(`Failed to fetch details for ${url}`);
                }
                return await appointmentRes.json();
            })
        );

        return { items: { data: appointments } };
    } catch (error) {
        return {
            error,
        };
    }
};
