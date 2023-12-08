console.log("test 1");

async function thankYou(){
  const config = {
    config: {
      widget: {
        elements: {
          brandLogo: {
            meta: {
              url: "#",
            },
            status: false,
            tag: "brandLogo",
          },
          buttons: {
            elements: {
              cart: {
                action: "redirectToCart",
                status: true,
                styles: {
                  "background-color": "#000000",
                  "border-color": "#000000",
                  color: "#FFFFFF",
                },
                tag: "cart-button",
              },
            },
            status: true,
            tag: "buttons",
          },
          compareAtPrice: {
            status: false,
            styles: {
              color: "#212121",
            },
            tag: "compare-price",
          },
          footer: {
            poweredBy: {
              status: true,
              tag: "powered-by",
            },
          },
          price: {
            status: true,
            styles: {
              color: "#000000",
            },
            tag: "price",
          },
          productImage: {
            status: true,
            styles: [],
            tag: "product-image",
          },
          productName: {
            status: true,
            styles: {
              color: "#000000",
            },
            tag: "product-name",
          },
          title: {
            status: true,
            styles: {
              color: "#000000",
            },
            tag: "title",
          },
        },
        page: "product",
        styles: {
          background: "#000000",
          "border-color": "#D4D8DF",
        },
      },
    },
    meta: {
      customCSS: "",
      customHTML: "",
    },
    settings: {
      behaviours: {
        display: {
          outOfStock: true,
        },
      },
      columns: {
        desktop: 5,
        mobile: 1,
        tablet: 2,
      },
      context: "generic",
      customHtml: {
        status: false,
      },
      languages: {
        default: "en",
        selected: ["en", "es"],
      },
      limit: 10,
      position: "bottom",
      rule: "BESTSELLERS",
      rules: {
        display: [],
        filters: [
          {
            condition: "IN",
            name: "popularity",
            selection: "static",
            threshold: 1,
            type: "condition",
            values: ["saleQuantity_all"],
          },
        ],
        sort: [
          {
            name: "popularity",
            order: "DESC",
            threshold: 1,
          },
        ],
      },
      template: "1.0",
      type: {
        desktop: "grid",
        mobile: "grid",
        tablet: "grid",
      },
    },
    contents: {
      en: {
        widget: {
          elements: {
            title: "Best sellers in store",
            footer: {
              poweredby: {
                link: "https://www.storefrog.com",
                title: "Powered by storefrog",
              },
            },
            buttons: {
              elements: { cart: "Add to cart", out_of_stock: "Out of stock" },
            },
          },
        },
      },
      fr: {
        widget: {
          elements: {
            title: "Best sellers in store",
            footer: {
              poweredby: {
                link: "https://www.storefrog.com",
                title: "Powered by storefrog",
              },
            },
            buttons: {
              elements: { cart: "Add to cart", out_of_stock: "Out of stock" },
            },
          },
        },
      },
    },
  };
  // Wait for the DOM to be ready

  async function fetchTemplate() {
    const response = await fetch(
      "https://wordpress-319567-1156599.cloudwaysapps.com/templates/1.0/template.json"
    );
    const data = await response.json();
    return data.list;
  }
  const template = await fetchTemplate();
  console.log(template);
  const products = await fetchData();
  console.log(products.product, "-");

  console.log(config.settings.limit);
  let productLimit = config.settings.limit

  products.product.slice(0, productLimit);
        const variantData = {};
        Object.entries(products.product).forEach(
          ([key, value]) => {
            if (value && typeof value === "object") {
              variantData[value.id] = value.variants;
            }
          }
        );
      console.log(variantData,'ppp');
      console.log(config?.contents?.['en']);
      const content = config?.contents?.['en']
      let data = {
        title: content?.widget.elements.title,
        cart_button_text: content.widget.elements.buttons.elements.cart,
        footer_text: content?.widget.elements.footer.poweredby.title,
        footer_link: content?.widget.elements.footer.poweredby.link,
        products: products.product,
        variants: variantData,
        settings: config.settings,
        config: config,
        elements: config.config.widget.elements,
        styleCon: {},
        html: template?.html,
      };

      const textRender = renderTemplate(template?.html, data);
      const bodyContent = attachStyles(config.config, textRender)


      function attachStyles(data = {}, html,viewport,shopUrl,appName) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const tagItems = doc.querySelectorAll("[data-tag]");
          tagItems.forEach((item) => {
            const currentTag = item.getAttribute("data-tag");
            const config = findObjectByKeyValue(data, "tag", currentTag);
            if (!config) return;
            if (!config.status) {
              item.remove();
              return;
            }
            let styles = "";
            for (const key in config?.styles) {
              styles += `${key}: ${config.styles[key]};`;
            }
            // @ts-ignore
            item.style.cssText = styles;
          });
          // const widget = document.querySelector(`[data-widget-id="${widgetId}"]`);
        const productGrid = doc.querySelector(".sf-product-grid")  ;
        if (productGrid) {
        
          if(data.settings.type[viewport]==="grid"){
            // @ts-ignore
            productGrid.style.setProperty(
              "--sf-grid-count",data?.settings?.columns[viewport]
            );
          }
        }
        const brandContainer = doc.querySelector('.sf-brand-container');
        if (brandContainer) {
          const link = doc.createElement('a');
          link.href = `https://${shopUrl}/admin/apps/${appName}/app/settings`;
          link.target="_blank"
          link.textContent = 'Click to remove'; 
          link.style.color = '#2C6ECB'
          link.style.marginRight="8px"
          link.style.fontWeight="600"
          brandContainer.insertBefore(link, brandContainer.firstChild);
        }
        
        return doc.body.innerHTML;
      }
      
  // Create the div element with the specified HTML content
  let templateStyle = document.createElement('style');
  templateStyle.innerText = template.style

  document.head.appendChild(templateStyle)

  function renderTemplate(template, data) {
    const tags = {
      forStart: "{% for",
      forEnd: "{% endfor %}",
      variableStart: "{{",
      variableEnd: "}}",
      ifStart: "{% if",
      ifEnd: "{% endif %}",
      innerForStart: "{% forinner",
      innerForEnd: "{% endforinner %}",
    };
  
    function replaceInnerForLoops(template) {
      const innerForStartRegex = new RegExp(`${tags.innerForStart} (.+?) %}`);
      const innerForEndRegex = new RegExp(tags.innerForEnd);
      let result = template;
      while (innerForStartRegex.test(result)) {
        const innerForStartMatch = result.match(innerForStartRegex);
        const innerForEndMatch = result.match(innerForEndRegex);
        const loopContent = result.slice(
          innerForStartMatch?.index + innerForStartMatch[0]?.length,
          innerForEndMatch?.index
        );
        const loopVariable = innerForStartMatch[1]?.trim();
        const wordAfterIn = loopVariable.split("in")[1].trim();
        const matchResult = loopVariable.match(/and\s+(\d+)\s+in/);
        const productId = matchResult ? matchResult[1] : "";
        let loopResult = "";
  
        const variants = data[wordAfterIn];
        // let variantKey = productId;
        const variantArray = variants[productId];
  
        for (const variant of variantArray) {
          loopResult += replaceVariables(loopContent, {
            // variantKey,
            variant,
          });
        }
  
        result = result.replace(
          `${innerForStartMatch[0]}${loopContent}${innerForEndMatch[0]}`,
          loopResult
        );
      }
      return result;
    }
  
    function replaceForLoops(template) {
      const forStartRegex = new RegExp(`${tags.forStart} (.+?) %}`);
      const forEndRegex = new RegExp(tags.forEnd);
      let result = template;
      while (forStartRegex.test(result)) {
        const forStartMatch = result.match(forStartRegex);
        const forEndMatch = result.match(forEndRegex);
        const loopContent = result.slice(
          forStartMatch?.index + forStartMatch[0]?.length,
          forEndMatch?.index
        );
        const loopVariable = forStartMatch[1]?.trim();
        const wordAfterIn = loopVariable.split("in")[1].trim();
        let loopResult = "";
  
        for (const product of data[wordAfterIn]) {
          loopResult += replaceVariables(loopContent, {
            product,
          });
        }
  
        result = result.replace(
          `${forStartMatch[0]}${loopContent}${forEndMatch[0]}`,
          loopResult
        );
      }
      return result;
    }
  
    // Replace variable placeholders with actual values
    function replaceVariables(template, variables) {
      const variableRegex = /{{(.*?)}}/g;
      let result = template;
  
      // Recursive function to traverse the variables object
      function traverseObject(obj, path) {
        const keys = path.split(".");
        let value = obj;
  
        for (const key of keys) {
          if (value.hasOwnProperty(key)) {
            value = value[key];
          } else {
            return undefined;
          }
        }
  
        return value;
      }
  
      result = result?.replace(variableRegex, (match, placeholder) => {
        const value = traverseObject(variables, placeholder.trim());
  
        //    if (placeholder.trim() === "styleCon") {
        //      return data.styleCon;
        //    }
  
        return value !== undefined ? value : match;
      });
  
      return result;
    }
  
    return replaceVariables(
      replaceInnerForLoops(replaceForLoops(template)),
      data
    );
  

    // return replaceVariables(replaceForLoops(template), data);
  }
  
  function findObjectByKeyValue(
    obj,
    key,
    value
  ) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop === key && obj[prop] === value) {
          return obj;
        }
        if (typeof obj[prop] === "object") {
          const foundObject = findObjectByKeyValue(obj[prop], key, value);
          if (foundObject !== null) {
            return foundObject;
          }
        }
      }
    }
    return null;
  }


const checkoutData = window.Shopify.checkout
// Find the product with the highest price
const highestPriceProduct = checkoutData.line_items.reduce((maxProduct, currentItem) => {
  const currentPrice = parseFloat(currentItem.price);
  const maxPrice = parseFloat(maxProduct.price);

  return currentPrice > maxPrice ? currentItem : maxProduct;
}, checkoutData.line_items[0]);

// Get the product ID of the product with the highest price
const highestPriceProductId = highestPriceProduct.product_id;

console.log("Product ID with the highest price:", highestPriceProductId);
  console.log("start")

  // Find the element with the class .order-summary__section--total-lines
  var totalLinesSection = document.querySelector('.order-summary--is-collapsed');
  console.log(totalLinesSection)
  // Check if the element is found
  if (totalLinesSection) {
    // Create a new div element
    var newDiv = document.createElement('div');
newDiv.innerHTML = `
  <div>
    ${bodyContent}
    </div>
`;

// Append the new div to the body of the document

    // Append the new div under the .order-summary__section--total-lines element
    totalLinesSection.appendChild(newDiv);
  }
}


 // Wait for the DOM to be ready
 async function fetchData() {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/Niranjan-CK/sample-script/product1.json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


thankYou().then(()=>{
  handleDropdown()
})

  async function handleDropdown(){
    const setHeight = document.getElementsByClassName("order-summary__sections")
    if(setHeight){
      setHeight.style.height = 'auto'
    }
      const selectDropdowns = document.getElementsByClassName("sf-product-variants-dropdown");
      const products = await fetchData();
        const Dproducts = products.product;
        
        Dproducts.forEach((item)=>{
          if (item.totalVariants <= 1){
            const iframeDocument = document;
            console.log(`[data-product-id="${item.id}"]`,'product')
            const product = iframeDocument.querySelector(`[data-product-id="${item.id}"]`);
            console.log(product,'product')
            const variant  = product?.querySelector(".sf-product-variants-dropdown");
            console.log(variant,'vartyu')
            if(variant){
              variant.style.display = "none"
            }
          }
          else{
            for (const dropdown of selectDropdowns) {
              dropdown.addEventListener("change", (event) => {
                const productId = dropdown.dataset.mainProductId;
                const variantId = +event.target.value;

                // Access the document inside the iframe
                const iframeDocument = document;

                // Find the product element inside the iframe
                const product = iframeDocument.querySelector(`[data-product-id='${productId}']`);
                if (!product) return; // If product not found in iframe, return

                const imgElement = product.querySelector(".sf-product-image");
                const priceElement = product.querySelector(".sf-product-price"); 

                const variant = products.product.find((product) => product.id === +productId)
                  .variants.find((variant) => variant.variant_id === variantId);

                imgElement.src = variant.variant_featured_image;
                priceElement.textContent = variant.variant_price; 
              });
            }
          }
        })
    
  }
