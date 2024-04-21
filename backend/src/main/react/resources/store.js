import { create } from 'zustand';

let useStore = create((set, get) => ({
  selectedForm: 'form1',
  formData: { date: new Date().toISOString().split('T')[0] },
  results: null,

  setSelectedForm: (form) => set({ selectedForm: form }),
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setResults: (results) => set({ results }),

  fetchLocalApodData: async () => {
    const apiKey = "Epi0Oq0qLq0OP1HYN7N01IXazaijyh7FhJFQdlHs";
    let baseUrl = `/pod`;

    const { selectedForm,formData } = get();
    if (selectedForm == 'form1') {
      baseUrl += `?date=${formData.date}`;
    } if (selectedForm == 'form2') {
      baseUrl += `?count=${formData.count}`;
    } else if (formData.startDate && formData.endDate) {
      baseUrl += `?start_date=${formData.startDate}&end_date=${formData.endDate}`;
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        const data = await response.json();
        set({ results: data });
        return true;
      }
    } catch (error) {
      console.error("Failed to fetch from local API:", error);
    }
    return false;
  },

  fetchNasaApodData: async () => {
    const apiKey = "Epi0Oq0qLq0OP1HYN7N01IXazaijyh7FhJFQdlHs";
    let baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    const { formData } = get();
    if (formData.date) {
      baseUrl += `&date=${formData.date}`;
    } else if (formData.count) {
      baseUrl += `&count=${formData.count}`;
    } else if (formData.startDate && formData.endDate) {
      baseUrl += `&start_date=${formData.startDate}&end_date=${formData.endDate}`;
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        const data = await response.json();
        set({ results: data });
      }
    } catch (error) {
      console.error("Failed to fetch from NASA APOD API:", error);
    }
  },

  fetchApodData: async () => {
    const localFetchSuccess = await get().fetchLocalApodData();
    if (!localFetchSuccess) {
      get().fetchNasaApodData();
    }
  },
}));

export default useStore;
