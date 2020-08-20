import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class EmailComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private emailInput: HTMLInputElement;
	private label: HTMLLabelElement;
	private _notifyOutputChanged: () => void;
	private errorMsg: string;
	private _context: ComponentFramework.Context<IInputs>;
	private _container: HTMLDivElement;
	private _break: HTMLBRElement;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._context = context;
		this.errorMsg = "";
		this._notifyOutputChanged = notifyOutputChanged;
		this._container = document.createElement("div");
		this.emailInput = document.createElement("input");
		this._break = document.createElement("br");
		this.label = document.createElement("label");
		this.label.style.color = "red";
		this.emailInput.addEventListener('focusout', this.onDataChange.bind(this));
		this.label.innerHTML = this.errorMsg;
		this._container.appendChild(this.emailInput);
		this._container.appendChild(this._break);
		this._container.appendChild(this.label);
		container.appendChild(this._container);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	public async onDataChange(event: Event): Promise<void> {
		var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		if (!regexp.test(this.emailInput.value)) {
			this.errorMsg = "Please enter valid mail";
		}
		else {
			this.errorMsg = "";
		}
		this.label.innerHTML = this.errorMsg;
		console.log(this.label.innerHTML);
		this._notifyOutputChanged;
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}