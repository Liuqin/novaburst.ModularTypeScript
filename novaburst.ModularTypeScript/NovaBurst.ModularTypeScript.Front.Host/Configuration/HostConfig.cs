using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaBurst.ModularTypeScript.Front.Host
{
    /// <summary>
    /// Front hosting configuration.
    /// </summary>
    public class HostConfig : ConfigurationSection
    {
        /// <summary>
        /// Available configuration properties names.
        /// </summary>
        private static class ConfigurationPropertyNames
        {
            public const string Url = "url";
            public const string WebsiteLocation = "websiteLocation";
        }

        /// <summary>
        /// URL on which OWIN host will listen for HTTP requests.
        /// </summary>
        [ConfigurationProperty(ConfigurationPropertyNames.Url)]
        public string Url
        {
            get { return (string)this[ConfigurationPropertyNames.Url]; }
            set { this[ConfigurationPropertyNames.Url] = value; }
        }

        /// <summary>
        /// Website static files location.
        /// </summary>
        [ConfigurationProperty(ConfigurationPropertyNames.WebsiteLocation, DefaultValue = "website")]
        public string WebsiteLocation
        {
            get 
            { 
                return (string)this[ConfigurationPropertyNames.WebsiteLocation];
            }
            set 
            { 
                this[ConfigurationPropertyNames.WebsiteLocation] = value; 
            }
        }


        /// <summary>
        /// Get Front app configuration by section name.
        /// </summary>
        /// <param name="sectionName"> Configuration section name. </param>
        /// <returns> Front app host configuration. </returns>
        public static HostConfig GetByName(string sectionName)
        {
             HostConfig config = ConfigurationManager.GetSection(sectionName) as HostConfig;

             if (config == null)
             {
                 throw new FrontHostConfigNotFoundException(sectionName);
             }

             return config;
        }

        /// <summary>
        /// Get default Front app config.
        /// </summary>
        /// <returns> Front app config. </returns>
        public static HostConfig GetDefault()
        {
            string sectionName = "frontHost";

            HostConfig config = GetByName(sectionName);

            return config;
        }
    }
}
