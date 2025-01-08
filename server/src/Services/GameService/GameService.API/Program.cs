using BuildingBlocks.Cors;
using BuildingBlocks.Http.OptionsSetup;
using BuildingBlocks.Messaging.MassTransit;
using GameService.API.Hubs;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add pipelines
builder.Services.AddValidatorsFromAssembly(AssemblyReference.Assembly, includeInternalTypes: true);

builder.Services.AddMediatR(config =>
{
    config.RegisterServicesFromAssembly(AssemblyReference.Assembly);
    config.AddOpenBehavior(typeof(ValidationPipelineBehavior<,>));
});

builder.Services.AddCarter();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Add SignalR
builder.Services
    .AddSignalR()
    .AddJsonProtocol(options =>
    {
        options.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Add database and message broker
builder.Services.AddMarten(options =>
{
    options.Connection(builder.Configuration.GetConnectionString("Database")!);
    options.UseNewtonsoftForSerialization(enumStorage: EnumStorage.AsString);
    options.DisableNpgsqlLogging = true;

    options.Schema.For<Game>();
    options.Schema.For<Quiz>();
}).UseLightweightSessions();

builder.Services.AddMessageBroker(builder.Configuration, Assembly.GetExecutingAssembly());

// Add authentication and authorization
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = PayloadDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = PayloadDefaults.AuthenticationScheme;
    })
    .AddScheme<AuthenticationSchemeOptions, PayloadAuthenticationHandler>(PayloadDefaults.AuthenticationScheme, options => { });

builder.Services.AddAuthorization(ConfigurePolicies.AddAllPolicies);

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IClaimService, ClaimService>();

// Servives configuration
builder.Services.ConfigureOptions<InternalServiceOptionsSetup>();

builder.Services.AddMediaServiceClient();
builder.Services.AddEventServiceClient();


if (builder.Environment.IsDevelopment())
{
    builder.Services.InitializeMartenWith<InitialData>();
}

builder.Services.AddExceptionHandler<GlobalExceptionhandler>();

// Add cors
builder.Services.AddAllowAllCors();



var app = builder.Build();



// Configure the HTTP request pipline
app.UseExceptionHandler(config => { });

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapCarter();

// Configure signalR hubs
app.MapHub<QuizGameHub>("/hub/games/quiz");

app.Run();
