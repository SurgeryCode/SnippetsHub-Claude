(() => {
  const data = window.SnippetsHubLocalization;
  if (!data || !data.requestCountry || !data.availableCountries || !data.availableCountries.length) return;

  const storageKey = 'snippetsHubLocalizationLocked';
  try {
    if (localStorage.getItem(storageKey)) return;
  } catch (error) {
    return;
  }

  const currentCountry = data.currentCountry;
  const targetCountry = data.requestCountry;

  if (!targetCountry || targetCountry === currentCountry) return;
  if (!data.availableCountries.includes(targetCountry)) return;

  const form =
    document.getElementById('AutoLocalizationForm') || document.querySelector('form[action*="localization"]');
  if (!form) return;

  const input = form.querySelector('input[name="country_code"]');
  if (!input) return;

  input.value = targetCountry;

  try {
    localStorage.setItem(storageKey, '1');
  } catch (error) {
    // Ignore storage errors and proceed with submit.
  }

  form.submit();
})();
