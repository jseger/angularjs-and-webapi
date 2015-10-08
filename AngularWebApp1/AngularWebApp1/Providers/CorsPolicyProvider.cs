using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace AngularWebApp1.Providers
{
    public class CorsPolicyProvider : Attribute, ICorsPolicyProvider
    {
        private CorsPolicy _policy;

        public CorsPolicyProvider()
        {
            // Create a CORS policy.
            _policy = new CorsPolicy
            {
                AllowAnyMethod = true,
                AllowAnyHeader = true,
                AllowAnyOrigin = true,
                SupportsCredentials = true
            };

            _policy.Origins.Add("*");
            _policy.Origins.Add("http://hawkwareapps.com");
            _policy.Origins.Add("http://www.hawkwareapps.com");
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_policy);
        }
    }
}