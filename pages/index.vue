<template>
  <div class="home">
    <h1>Parse recipe ingredients easily</h1>

    <div class="flex-container">
      <p>
        Zestful's ingredient parser API turns plain recipe strings into
        beautiful, structured JSON data.
      </p>
      <img
        class="img-fluid img-ingredient-translation"
        src="/images/ingredient-translation.png"
        alt="Translating an ingredient into structured JSON"
      />
    </div>

    <h2>Helping recipe app developers</h2>

    <p>
      Zestful makes recipe apps smarter about managing ingredients. Zestful
      transforms ingredients from opaque strings to meaningful data in
      easy-to-consume JSON format.
    </p>

    <h2>Keep the data you purchase</h2>

    <p>
      Zestful licenses its data with
      <nuxt-link to="/terms-of-service">developer-friendly terms</nuxt-link>:
    </p>

    <ul>
      <li>Unlimited data retention</li>
      <li>No restrictions on resale</li>
      <li>Zero attribution requirement</li>
    </ul>

    <p>
      Solutions like Spoonacular and Edamam prohibit developers from storing the
      ingredients they parse:
    </p>

    <div class="quote">
      <blockquote>
        You may not scrape the spoonacular API or in any way attempt to
        <strong>copy or store the information it provides</strong>, including
        any derived, hashed, or transformed data... If you stop using the
        spoonacular API or if your access to the API is suspended for any
        reason, then you must delete all data you ever obtained from the
        spoonacular API.
      </blockquote>
      <p class="quote-source">
        -Spoonacular's
        <!-- prettier-ignore -->
        <a href="https://spoonacular.com/food-api/terms" rel="nofollow">Terms of Service</a>
      </p>
    </div>

    <div class="quote">
      <blockquote>
        You are prohibited from
        <strong>copying or archiving</strong> any of Edamam Content and/or
        collecting any data from Edamam Content, without Edamam’s prior written
        consent... In the event this agreement between you and Edamam under
        these Terms is terminated for any reason... you shall forthwith and
        permanently delete all Edamam Content which you used and/or
        stored/archived in connection with your use of the Edamam API.
      </blockquote>
      <p class="quote-source">
        -Edamam's
        <!-- prettier-ignore -->
        <a href="https://developer.edamam.com/about/terms" rel="nofollow">Terms of Service</a>
      </p>
    </div>

    <h2>Contact</h2>

    <p>
      Questions? Please reach out to
      <a href="mailto:michael@zestfuldata.com">michael@zestfuldata.com</a>, and
      I'll be happy to assist you.
    </p>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Simple API for Parsing Recipe Ingredients',
  },
};
</script>

<style scoped>
h1 {
  font-size: 3em;
  margin-bottom: 50px;
}

h2 {
  font-size: 2.5em;
}

p {
  font-size: 1.5em;
}

.flex-container {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  .flex-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

@media screen and (min-width: 768px) {
  .flex-container p {
    margin-right: 50px;
  }
}

@media screen and (min-width: 768px) {
  .img-ingredient-translation {
    max-height: 450px;
  }
}

.quote {
  width: 70%;
  margin: 60px 0px 60px 40px;
}

blockquote {
  font-style: italic;
  margin-bottom: 15px;
  background: rgb(240, 240, 240);
  padding: 20px;
}

.quote-source {
  text-align: right;
}

.quote-source a {
  font-weight: 400;
}
</style>
